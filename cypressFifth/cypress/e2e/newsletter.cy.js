describe('newsletter', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
    });
    it('should display a success message', () => {
        // Gercekten be hitlemek istemiyoruz.
        // Dolayisiyla HTTP req engellemek icin intercept ozelligi kullanabiliriz.
        // 3. arguman bize direk olarak donen response. Bizim verdigimiz. 
        // 2 arg olursa tam olarak engellenmez. Spy eklemis oluruz sadece. 
        cy.intercept('POST','/newsletter*',{ status: 201}).as('subscribe');
        cy.visit('/');
        cy.get('[data-cy="newsletter-email"]').type('test@example.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        // intercept icin bekleriz.  
        cy.wait('@subscribe');
        cy.contains('Thanks for signing up!');
    });

    it('should display validation error', () => {
        cy.intercept('POST','/newsletter*',{ message:'Email exist already.'}).as('subscribe');
        cy.visit('/');
        cy.get('[data-cy="newsletter-email"]').type('test@example.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        // intercept icin bekleriz.  
        cy.wait('@subscribe');
        cy.contains('Email exist already.');
    });

    it('should successfully create a new contact', () => {
        // fe kullanmadan istek atar
        cy.request({
            method: 'POST',
            url: '/newsletter',
            body: { email: 'text@example.com'},
            form: true
        })
        .then((res) => {
            expect(res.status).to.eq(201);
        })
    }) 
})