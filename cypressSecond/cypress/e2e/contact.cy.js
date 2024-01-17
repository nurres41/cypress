/// <reference types="Cypress" />

describe('contact form', () => {
    it('should add contact', () => {
        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy="contact-input-message"]').type('Description');
        cy.get('[data-cy="contact-input-name"]').type('Nuri');


        // Altta bunun then yapisi ile yazilmisi var. Ayni islev
        cy.get('[data-cy="contact-btn-submit"]')
            .contains('Send Message')
            // We can use should but and more readable. Same functionality
            .and('not.have.attr', 'disabled');

        // Alternative way alias
        cy.get('[data-cy="contact-btn-submit"]').then((el) => {
            expect(el.attr('disabled')).to.be.undefined;
            expect(el.text()).to.equal('Send Message')
        })

        // {enter} demek enter basilmasini saglar. 
        cy.get('[data-cy="contact-input-email"]').type('nuri@gmail.com{enter}');

            
        // Use alias for duplicate element
        cy.get('[data-cy="contact-btn-submit"]').as('submitBtn')     
        cy.get('@submitBtn').click();
        cy.get('@submitBtn').contains('Sending');
        cy.get('@submitBtn').should('have.attr', 'disabled');
    })
})