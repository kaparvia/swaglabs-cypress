import data from "../../fixtures/test_data.json";

describe('Inventory', () => {

    before(() => {
        cy.login(data.users.standard_user.username, data.users.standard_user.password);
        cy.get('#inventory_container').should('be.visible');
    })

    it.only('shop and checkout without', () => {

        // Add item to cart
        cy.contains('.inventory_item_name', 'Sauce Labs Fleece Jacket').parents('.inventory_item').find('.btn_primary').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');

        // Remove the added item from cart
        cy.contains('.inventory_item_name', 'Sauce Labs Fleece Jacket').parents('.inventory_item').find('.btn_secondary').click();
        cy.get('.shopping_cart_badge').should('not.exist');

        // Open and close the side menu
        cy.get('#react-burger-menu-btn').click();
        cy.get('#inventory_sidebar_link').should('be.visible');

        cy.get('#react-burger-cross-btn').click();
        cy.get('#inventory_sidebar_link').should('not.be.visible');

        // Filter by lowest price and add first two items to the cart
        cy.get('.product_sort_container').select('lohi');
        cy.get('.inventory_item').eq(0).find('.inventory_item_name').should('have.text', 'Sauce Labs Onesie');
        cy.get('.inventory_item').eq(0).find('.btn_primary').click();

        cy.get('.inventory_item').eq(1).find('.inventory_item_name').should('have.text', 'Sauce Labs Bike Light');
        cy.get('.inventory_item').eq(1).find('.btn_primary').click();

        cy.get('.shopping_cart_badge').should('have.text', '2');

        // Open cart and remove one item
        cy.get('.shopping_cart_link').click();
        cy.get('#cart_contents_container').should('be.visible');
        cy.get('.cart_item').should('have.length', 2);

        cy.contains('.inventory_item_name', 'Sauce Labs Bike Light').parents('.cart_item').find('.btn_secondary').click();
        cy.get('.cart_item').should('have.length', 1);

        // Click "Checkout" but back out to the main page
        cy.get('#checkout').click();
        cy.get('#checkout_info_container').should('be.visible');

        cy.get('#cancel').click();
        cy.get('#cart_contents_container').should('be.visible');

        cy.get('#continue-shopping').click();
        cy.get('#inventory_container').should('be.visible');

        // Add one more item to cart

        cy.contains('.inventory_item_name', 'Sauce Labs Fleece Jacket').parents('.inventory_item').find('.btn_primary').click();
        cy.get('.shopping_cart_badge').should('have.text', '2');

        // Check out for real
        cy.get('.shopping_cart_link').click();
        cy.get('.cart_item').should('have.length', 2);

        cy.get('#checkout').click();

        cy.get('#first-name').type('FirstName');
        cy.get('#last-name').type('LastName');
        cy.get('#continue').click();

        // Forgot the zip code
        cy.get('.error').should('have.text', 'Error: Postal Code is required');
        cy.get('.error-button').click();
        cy.get('.error').should('not.exist');

        cy.get('#postal-code').type('12345');
        cy.get('#continue').click();
        cy.get('#checkout_summary_container').should('be.visible');

        cy.get('.cart_item').should('have.length', 2);
        cy.get('.summary_subtotal_label').then( ($element) => {

            let elementText = $element.text();
            let totalAmountSubstring = elementText.substring(elementText.indexOf('$'));

            expect(totalAmountSubstring, 'Cart total').to.equal('$57.98');
        });

        cy.get('#finish').click();
        cy.get('#checkout_complete_container').should('be.visible');
    });
})