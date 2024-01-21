describe('Auth', () => {
  it('should signup', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
    })
    cy.visit('/signup');
    cy.get('[data-cy="auth-email"]').type('test2@example.com');
    cy.get('[data-cy="auth-password"]').type('testpassword');
    cy.get('[data-cy="auth-submit"]').click();  
    cy.location('pathname').should('eq', '/takeaways');
    // getCookie ile __session aldik its ile de degerini almak istedigimiz alani belirttik.
    cy.getCookie('__session').its('value').should('not.be.empty'); 
  });

  // Login
  it('should login flow', () => {
    cy.visit('/login');
    cy.get('[data-cy="auth-email"]').type('test@example.com');
    cy.get('[data-cy="auth-password"]').type('testpassword');
    cy.get('[data-cy="auth-submit"]').click();  
    cy.location('pathname').should('eq', '/takeaways');
    // getCookie ile __session aldik its ile de degerini almak istedigimiz alani belirttik.
    cy.getCookie('__session').its('value').should('not.be.empty'); 
  });

  // Logout
  it('should logout', () => {
    cy.login();
    cy.contains('Logout').click();
    cy.location('pathname').should('eq', '/');
    cy.getCookie('__session').its('value').should('be.empty');
  });
})
