/// <reference types="Cypress" />

describe('task management', () => {
    it('should open and close the add new task modal', () => {
        cy.visit('http://localhost:5173/');
        cy.get('#task-control button').contains('Add Task').click();
        cy.get('.backdrop').click({force: true});
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
        cy.contains('Add Task').click();
        cy.contains('Cancel').click();
        cy.get('.modal').should('not.exist');
        cy.get('.backdrop').should('not.exist');
    });

    it('should create a new task', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('#title').type('New Task');
        cy.get('#summary').type('Descirption');
        cy.get('.modal').contains('Add Task').click();
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
        cy.get('.task').should('have.length',1);
        cy.get('.task h2').contains('New Task');
        cy.get('.task p').contains('Descirption');
    });

    it('should validate user input', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('.modal').contains('Add Task').click();
        cy.contains('Please provide values');
    });

    it('should filter task', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('#title').type('New Task');
        cy.get('#summary').type('Descirption');
        cy.get('#category').select('urgent');
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length',1);
        cy.get('#filter').select('moderate');
        cy.get('.task').should('have.length',0);
        cy.get('#filter').select('urgent');
        cy.get('.task').should('have.length',1);
    });

    it('should add multiple tasks', () => {
        cy.visit('http://localhost:5173/');
        
        //Add First Task
        cy.contains('Add Task').click();
        cy.get('.modal').should('exist');
        cy.get('#title').type('Title 1');
        cy.get('#summary').type('Description 1');
        cy.contains('Add Task').click();

        //Be sure close the modal
        cy.get('.modal').should('not.exist');
        cy.get('.backdrop').should('not.exist');
        
        //Add Second Task
        cy.contains('Add Task').click();
        cy.get('.modal').should('exist');
        cy.get('#title').type('Title 2');
        cy.get('#summary').type('Description 2');
        cy.contains('Add Task').click();

        //Be sure sorting
        cy.get('.task-list>.task').eq(0).find('div h2').contains('Title 1');
        cy.get('.task-list>.task').eq(0).find('div p').contains('Description 1');
        cy.get('.task-list>.task').eq(1).find('div h2').contains('Title 2');
        cy.get('.task-list>.task').eq(1).find('div p').contains('Description 2');
    })
})

///.eq kacinci eleman oldugunu bulmamizi saglar. First ve last diye komutlar vardir. 