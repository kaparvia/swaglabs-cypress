import BasePage from "./BasePage";
import CartPage from "./CartPage";

class CheckoutPage extends BasePage {

    // Abstract implementation
    shouldBeVisible(): void {
        cy.get('#checkout_info_container').should('be.visible');
    }

    // Element getters
    getError() {
        return cy.get('.error');
    }

    // Actions on elements

    // Action methods
    cancel(): void {
        cy.get('#cancel').click();
        CartPage.shouldBeVisible();
    }

    continue(): void {
        cy.get('#continue').click();
        // Do not check for the next page because there might be errors
    }

    enterFirstName(name: string): CheckoutPage {
        cy.get('#first-name').type(name);
        return this;
    }

    enterLastName(name: string): CheckoutPage {
        cy.get('#last-name').type(name);
        return this;
    }

    enterZipcode(zipcode: string): CheckoutPage {
        cy.get('#postal-code').type(zipcode);
        return this;
    }

    dismissError(): void {
        cy.get('.error-button').click();
        cy.get('.error').should('not.exist');
    }
}

export default new CheckoutPage();