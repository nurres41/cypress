/// <reference types="cypress" />

describe('share location', () => {
  it('should fetch the user location', () => {
    cy.visit('/').then((window) => {
      // Alias kullandigimiz icin tekrar kullanilabilir.
      cy.stub(window.navigator.geolocation, 'getCurrentPosition')
      .as('getUserPosition')
      .callsFake((cb) => {
        setTimeout(() => {
          cb({
            coords: {
              latitude: 41, 
              longitude: 41
            },
          });
        },200)
      });
    });
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserPosition').should('have.been.called');
    cy.get('[data-cy="get-loc-btn"]').should('contain', 'Fetching data');
  });
});
