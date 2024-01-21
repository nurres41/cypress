/// <reference types="Cypress" />

describe('Takeaways', () => {
  it('should display a list of fetched takeaways', () => {
    cy.visit('/'); 
    cy.get('[data-cy="takeaway-item"]').should('have.length',2);
  });

  it('should add a new takeaway', ()=> {
    cy.intercept('POST', '/takeaways/new*', 'success').as('createTakeaway')
    cy.login();
    cy.visit('/takeaways/new');
    cy.get('[data-cy="title"]').click();
    cy.get('[data-cy="title"]').type('Title');
    cy.get('[data-cy="body"]').type('Body');
    cy.get('[data-cy="create-takeaway"]').click();
    cy.wait('@createTakeaway')
      .its('request.body')
      // req body title=Title&body=Body gibi deger alir bunu da regex kullanarak match should yapariz.
      .should('match', /Title.*Body/);
  })
});
