/// <reference types="cypress" />

describe('share location', () => {
  beforeEach(() => {
    // Clock initialize aninda yapilmali
    cy.clock();
    // Data paylasimi yapilmasi mumkun cypress icinde. Fixtures klasoru altindan data olusturup bu datalari kullanabiliriz.
    cy.fixture("user-location").as('locationData');
    cy.visit('/').then((window) => {
      cy.get('@locationData').then((fakePosition) => {
          // Alias kullandigimiz icin tekrar kullanilabilir.
          cy.stub(window.navigator.geolocation, 'getCurrentPosition')
          .as('getUserPosition')
          .callsFake((cb) => {
            setTimeout(() => {
              cb(fakePosition);
            },200)
          });
    });
    
    // promise return ettigi icin resolves kullaniyoruz.
    cy.stub(window.navigator.clipboard,'writeText')
      .as('saveToClipboard')
      .resolves();  
    
    // Spy kullanimi
    cy.spy(window.localStorage, 'setItem').as('storeLocation');
    cy.spy(window.localStorage, 'getItem').as('getStoredLocation');  
    });
  });
  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserPosition').should('have.been.called');
    cy.get('[data-cy="get-loc-btn"]').should('have.attr', 'disabled');
    cy.get('[data-cy="actions"]').should('contain','Location fetched');
  });

  it('should share a location URL', () => {
    cy.get('[data-cy="name-input"]').type('John Doe');
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@saveToClipboard').should('have.been.called');
    // Location url olusturuldu mu?
    cy.get('@locationData').then((fakePosition) => {
      const {latitude, longitude} = fakePosition.coords;
      cy.get('@saveToClipboard').should(
        'have.been.calledWithMatch',
        // Regex olarak urlde arama yapiyoruz
        new RegExp(`${latitude}.*${longitude}.*${encodeURI('John Doe')}`)
      );
      cy.get('@storeLocation').should('have.been.called');
      cy.get('@storeLocation').should(
        // setItem icin iki params istiyor. O yuzden iki adet parametre giriyoruz.
        'have.been.calledWithMatch',
        /John Doe/,
        new RegExp(`${latitude}.*${longitude}.*${encodeURI('John Doe')}`)
      );
    });

    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@getStoredLocation').should('have.been.called');

    // Banner visible control
    cy.get('[data-cy="info-message"]').should('be.visible');
    cy.get('[data-cy="info-message"]').should('have.class','visible');
    // Bu testten gecer. Cunku test timeout 4 sn surer. 4 sn boyunca herhangi bir anda gerceklesmesi yeterli olacaktir.
    // 2 saniye banner gosteriliyor. Fakat bunu beklemek sorun cikartabilir. Clock ile time manipule edilebilir. Timer skip edilebilir.
    cy.tick(2000);
    cy.get('[data-cy="info-message"]').should('not.be.visible');

  })
});
