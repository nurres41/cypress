/// <reference types="Cypress" />

describe('Temel Komutlar', () => {
    it('Temel komutlar visit', () => {
        cy.visit('/') //baseUrl tanimliysa
        cy.visit('http://example.cypress.io') // baseUrl tanimli degilse
        cy.visit({
            url: "/",
            method: "GET"
        }) // Method belirtmek istersek
    });

    it('Title kullanimi', () => {
        // Sayfa basligini dogrulamak icin
        cy.title().should('eq', 'cypress.io'); // title tam esitlik
        cy.title().should('include', 'cypress.io'); // bu degeri icermesi yeterli
        cy.title().should('contain', 'cypress.io'); // bu degeri icermesi yeterli
    });

    it('Location Kullanimi', () => {
        cy.url().should('eq', 'http://localhost5173/') // url dogrulamak 

        cy.location('pathname').should('eq', '/about-us'); // sadece path sorgular
        cy.location('protocol').should('eq', 'https'); // protokol dogrular
    });

    // it.skip veya it.only kullanirsak testin yoksayip veya sadece o testin run olmasini saglayabiliriz.
    it.skip('log kullanimi', () => {
        cy.log('Burasi log'); // Console.log gibi 
    });
});

