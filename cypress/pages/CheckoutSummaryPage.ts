import BasePage from "./BasePage";

class CheckoutSummaryPage extends BasePage {

    // Abstract implementation
    shouldBeVisible(): void {
        cy.get('#checkout_summary_container').should('be.visible');
    }

    // Element getters
    getAllItems() {
        return cy.get('.cart_item');
    }

    // Actions on elements

    // Assertions
    shouldHaveTotalAmount(expectedAmount : number): void {
        cy.get('.summary_subtotal_label').then( ($element) => {

            let elementText = $element.text();
            let totalAmountSubstring = elementText.substring(elementText.indexOf('$'));

            expect(totalAmountSubstring, 'Cart total').to.equal(expectedAmount);
        });

    }

    // Action methods
    finish() {
        cy.get('#finish').click();
        cy.get('#checkout_complete_container').should('be.visible');
    }
}

export default new CheckoutSummaryPage();