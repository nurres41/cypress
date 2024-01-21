import { defineConfig } from 'cypress';

import { seed } from './prisma/seed-test';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // testler tarayici icinde dogrudan calistigi icin database gibi sorgulari yapmak icin on kullanilir.
      // bu sayede tarayici disinda calisir. cy.task() ile cagirilabilir.
      on('task', {
        async seedDatabase() {
          // work outside browser
          await seed();
          return null;
        }
      })
    },
  },
});
