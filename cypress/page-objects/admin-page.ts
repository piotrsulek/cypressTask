/// <reference types="cypress" />
export class AdminPage {
  changePasswordBtn() {
    return cy.get('div.MuiCardHeader-action > button');
  }
  prevPasswordInput() {
    return cy.get('input[name="oldPassword"]');
  }
  newPasswordInput() {
    return cy.get('input[name="newPassword"]')
  }
  btnSaveNewPassword() {
    return cy.get('button[type="submit"][data-test-state="default"]')
  }
  errorNotification() {
    return cy.get('[data-test="notification"][data-test-type="error"]')
  }

}