import {
  LoginPage
} from '../page-objects/login-page';
import {
  DashboardPage
} from '../page-objects/dashboard-page';
import {
  AdminPage
} from '../page-objects/admin-page';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const adminPage = new AdminPage();

describe('Change user password', () => {

  beforeEach(() => {
    cy.visit('https://demo.saleor.io/dashboard/')
    loginPage.emailInput().clear().type('admin@example.com')
    loginPage.passwordInput().clear().type('admin')
    loginPage.loginBtn().click()
    dashboardPage.userMenuDropdownMenu().click()
    dashboardPage.userMenuDropdownAccountSettingOption().click()
    adminPage.changePasswordBtn().click()
    adminPage.btnSaveNewPassword().should('be.disabled')
    adminPage.prevPasswordInput().type('admin')
    adminPage.newPasswordInput().type('test1234')
  })

  it('1. Login and change user password - demo mode', () => {

    cy.intercept('POST', '/graphql/', {
      "errors": [{
        "message": "Be aware admin pirate! API runs in read-only mode!.......",
        "locations": [{
          "line": 2,
          "column": 3
        }],
        "path": ["passwordChange"],
        "extensions": {
          "exception": {
            "code": "ReadOnlyException"
          }
        }
      }],
      "data": {
        "passwordChange": null
      },
      "extensions": {
        "cost": {
          "requestedQueryCost": 0,
          "maximumAvailable": 50000
        }
      }
    }).as('passwordChange')
    adminPage.btnSaveNewPassword().click()
    cy.wait('@passwordChange').then(() => {
      adminPage.errorNotification().should('be.visible')
    })
  })


  it('2. Login and change user password', () => {

    //I am not sure what the response should look like :)
    cy.intercept('POST', '/graphql/', {
      "errors": null,
      "data": {
        "passwordChange": true
      },
      "extensions": {
        "cost": {
          "requestedQueryCost": 0,
          "maximumAvailable": 50000
        }
      }
    }).as('passwordChange')
    adminPage.btnSaveNewPassword().click()
    cy.wait('@passwordChange').then(() => {
      adminPage.errorNotification().should('not.exist')
    })

  })

})