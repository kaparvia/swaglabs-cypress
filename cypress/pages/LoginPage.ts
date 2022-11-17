import BasePage from "./BasePage";

class LoginPage extends BasePage {

    // Abstract implementation
    shouldBeVisible(): void {
        cy.get('.login_wrapper').should('be.visible');
    }

    // Element getters
    getErrorMessage() {
        return cy.get('[data-test="error"]');
    }

    // Action methods
    login(username: string, password: string): void {
        if (username.length > 0) cy.get('#user-name').type(username);
        if (password.length > 0) cy.get('#password').type(password);

        cy.get('#login-button').click();
    }
}

export default new LoginPage();
