import LoginPage from '../../pages/LoginPage'
import data from '../../fixtures/test_data.json'
import InventoryPage from '../../pages/InventoryPage';

describe('Login', () => {

  beforeEach(() => {
    cy.visit('/');
  })

  it('with valid username', () => {
    LoginPage.login(data.users.standard_user.username, data.users.standard_user.password);
    InventoryPage.shouldBeVisible();
  })

  it('with locked out user', () => {

    LoginPage.login(data.users.locked_user.username, data.users.locked_user.password);
    LoginPage.getErrorMessage().should('have.text', data.users.locked_user.error);
  })

  it('with invalid username', () => { 
    LoginPage.login(data.users.invalid_username.username, data.users.invalid_username.password);
    LoginPage.getErrorMessage().should('have.text', data.users.invalid_username.error);

  })

  it('with invalid password', () => { 
    LoginPage.login(data.users.invalid_password.username, data.users.invalid_password.password);
    LoginPage.getErrorMessage().should('have.text', data.users.invalid_password.error);

  })

  it('with missing username', () => {
    LoginPage.login('', 'password');
    LoginPage.getErrorMessage().should('have.text', 'Epic sadface: Username is required');
  })

  it('with missing password', () => {
    LoginPage.login('username', '');
    LoginPage.getErrorMessage().should('have.text', 'Epic sadface: Password is required');
  })

})

