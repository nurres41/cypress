/// <reference types="Cypress" />

describe('validate data', () => {
    it('should validate form input', () => {
        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy="contact-btn-submit"]').click();
        cy.get('[data-cy="contact-btn-submit"]').then((el) => {
            expect(el).to.not.have.attr('disabled');
            expect(el.text()).to.not.equal('Sending...');
        });

        // Take screenshot
        cy.screenshot();
        
        cy.get('[data-cy="contact-btn-submit"]').contains('Send Message');

        cy.get('[data-cy=contact-input-message]').as('msgInput');

        cy.get('@msgInput')
            .focus()
            .blur();
        
        cy.get('@msgInput')
            .parent()
            .should('have.attr', 'class')
            // Iki // kullandimizda regex devreye girer ve clasin icinde invalid match oluyor mu diye kontrol yapilir.
            .and('match', /invalid/);

        cy.get('[data-cy="contact-input-name"]').as('nameInput');    

        cy.get('@nameInput')
            .focus()
            .blur();    
        
        cy.get('@nameInput')
            .parent()
            .should('have.attr', 'class')
            .should('match', /invalid/);
            
            // .then((el) => {
            //     expect(el.attr('class')).to.contains('invalid');
            // });

        cy.get('[data-cy="contact-input-email"]').as('emailInput');    

        cy.get('@emailInput')
            .focus()
            .blur();    
        
        cy.get('@emailInput')
            .parent()
            .should('have.attr', 'class')
            .should('match', /invalid/);
            // .then((el) => {
            //     expect(el.attr('class')).to.contains('invalid');
            // });
           
            
    })
})