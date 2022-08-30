/// <reference types="cypress" />
export class LoginPage {
  emailInput() {
    return cy.get('input[data-test-id="email"]');
  }
  passwordInput() {
    return cy.get('input[data-test-id="password"]');
  }
  loginBtn() {
    return cy.get('button[data-test-id="submit"]')
  }

}