import InventoryPage from "../../pages/InventoryPage";
import CartPage from "../../pages/CartPage";
import CheckoutPage from "../../pages/CheckoutPage";
import CheckoutSummaryPage from "../../pages/CheckoutSummaryPage";

import { FilterType } from "../../pages/InventoryPage";

import data from "../../fixtures/test_data.json";

describe('Inventory', () => {

    before(() => {
        cy.login(data.users.standard_user.username, data.users.standard_user.password);
        InventoryPage.shouldBeVisible();
    })

    it.only('shop and checkout', () => {

        // Add and remove items on the inventory page
        InventoryPage.getItemByName('Sauce Labs Fleece Jacket').then(InventoryPage.onElementAddToCart);
        InventoryPage.getCartIconCount().should('have.text', '1');

        InventoryPage.getItemByName('Sauce Labs Fleece Jacket').then(InventoryPage.onElementRemoveFromCart);
        InventoryPage.getCartIconCount().should('not.exist');

        // Open and close the sidebar menu
        InventoryPage.openMenu();
        InventoryPage.getSidebarMenu().should('be.visible');

        InventoryPage.closeMenu();
        InventoryPage.getSidebarMenu().should('not.be.visible');

        // Filter the catalog by price and add two cheapest items to the cart
        InventoryPage.filterBy(FilterType.FILTER_LOW_TO_HIGH);
        InventoryPage.getItemByIndex(0).then(InventoryPage.onElementGetItemName).should('have.text', 'Sauce Labs Onesie');
        InventoryPage.getItemByIndex(0).then(InventoryPage.onElementAddToCart);

        InventoryPage.getItemByIndex(1).then(InventoryPage.onElementGetItemName).should('have.text', 'Sauce Labs Bike Light');
        InventoryPage.getItemByIndex(1).then(InventoryPage.onElementAddToCart);
        InventoryPage.getCartIconCount().should('have.text', '2');

        // Open the cart and remove one item
        InventoryPage.openCart();
        CartPage.getAllItems().should('have.length', 2);

        CartPage.getItemByName('Sauce Labs Bike Light').then(CartPage.onElementRemoveFromCart)
        CartPage.getAllItems().should('have.length', 1);

        // Check out, change their mind and back out to inventory page to add one more item
        CartPage.checkout();
        CheckoutPage.cancel();
        CartPage.continueShopping();

        InventoryPage.getItemByName('Sauce Labs Fleece Jacket').then(InventoryPage.onElementAddToCart);
        InventoryPage.getCartIconCount().should('have.text', '2');

        // Check out for real
        InventoryPage.openCart();
        CartPage.getAllItems().should('have.length', 2);

        CartPage.checkout();
        CheckoutPage
            .enterFirstName('FirstName')
            .enterLastName('LastName')
            .continue();

        CheckoutPage.getError().should('have.text', 'Error: Postal Code is required');
        CheckoutPage.dismissError();

        CheckoutPage
            .enterZipcode('12345')
            .continue();
        
        CheckoutSummaryPage.shouldBeVisible();

        CheckoutSummaryPage.getAllItems().should('have.length', 2);
        CheckoutSummaryPage.shouldHaveTotalAmount(57.98);

        CheckoutSummaryPage.finish();
    })
})