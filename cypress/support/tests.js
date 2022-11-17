// Custom commands
Cypress.Commands.add('login', (username, password) => {
    cy.visit('/');
    
    if (username.length > 0) cy.get('#user-name').type(username);
    if (password.length > 0) cy.get('#password').type(password);

    cy.get('#login-button').click();
})