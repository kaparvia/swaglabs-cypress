import BasePage from "./BasePage";
import CartPage from "./CartPage";

class InventoryPage extends BasePage {

    // Abstract implementation
    shouldBeVisible(): void {
        cy.get('#inventory_container').should('be.visible');
    }

    // Element getters
    getCartIconCount() {
        return cy.get('.shopping_cart_badge'); 
    }

    getSidebarMenu() {
        return cy.get('#inventory_sidebar_link');
    }

    getItemByName(itemName: string) {
        return cy.contains('.inventory_item_name', itemName).parents('.inventory_item');
    }

    getItemByIndex(index: number) {
        return cy.get('.inventory_item').eq(index);
    }

    // Actions on elements
    onElementGetItemName(element) {
        return cy.wrap(element).find('.inventory_item_name');
    }

    onElementAddToCart(element): void {
        cy.wrap(element).find('.btn_primary').click();
    }

    onElementRemoveFromCart(element): void {
        cy.wrap(element).find('.btn_secondary').click();
    }

    // Action methods
    addToCart(itemName: string): void {
        this.getItemByName(itemName).find('.btn_primary').click();
    }

    openMenu(): void {
        cy.get('#react-burger-menu-btn').click();
    }

    closeMenu(): void {
        cy.get('#react-burger-cross-btn').click();
    }

    filterBy(filterType: FilterType): void {
        cy.get('.product_sort_container').select(filterType);
    }

    openCart(): void {
        cy.get('.shopping_cart_link').click();
        CartPage.shouldBeVisible();
    }
}

export const enum FilterType {
    FILTER_A_TO_Z = 'az',
    FILTER_Z_TO_A = 'za',
    FILTER_LOW_TO_HIGH = 'lohi',
    FILTER_HIGH_TO_LOW = 'hilo'
}

export default new InventoryPage();
