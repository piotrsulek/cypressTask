/// <reference types="cypress" />
export class DashboardPage {
  userMenuDropdownMenu() {
    return cy.get('button[data-test="userMenu"]');
  }
  userMenuDropdownAccountSettingOption() {
    return cy.get('li[data-test-id="account-settings-button"] a');
  }
}