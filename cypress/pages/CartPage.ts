import BasePage from "./BasePage";
import CheckoutPage from "./CheckoutPage";
import InventoryPage from "./InventoryPage";

class CartPage extends BasePage {

    // Abstract implementation
    shouldBeVisible(): void {
        cy.get('#cart_contents_container').should('be.visible');
    }

    // Element getters
    getAllItems() {
        return cy.get('.cart_item');
    }

    getItemByName(itemName: string) {
        return cy.contains('.inventory_item_name', itemName).parents('.cart_item');
    }

    // Actions on elements
    onElementRemoveFromCart(item) {
        cy.wrap(item).find('.btn_secondary').click();
    }

    // Action methods
    continueShopping() {
        cy.get('#continue-shopping').click();
        InventoryPage.shouldBeVisible();
    }

    checkout() {
        cy.get('#checkout').click();
        CheckoutPage.shouldBeVisible();
    }
}

export default new CartPage();