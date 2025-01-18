/// <reference types="cypress" />

describe('service is available', () => {
    it('should be available', () => {
        cy.visit('/');
    });
});

describe('create order flow works correctly', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
        cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.wait('@getIngredients').its('response.statusCode').should('eq', 200);
        cy.wait('@getUser').its('response.statusCode').should('eq', 200);
    });

    it('should disable the create order button when the constructor contains only a bun', () => {
        cy.get('[id="bun"] > ul > li > [class^=common_link__]').first().as('bun');
        cy.get('[class^=burger-constructor_emptyContainer__]').as('emptyDropTarget');

        cy.get('@bun')
            .drag('@emptyDropTarget');

        cy.contains('Оформить заказ')
            .should('be.visible')
            .and('be.disabled');
    });

    it('should drag and drop bun and sauce to constructor and create an order', () => {
        cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');

        cy.get('[id="bun"] > ul > li > [class^=common_link__]').first().as('bun');
        cy.get('[class^=burger-constructor_emptyContainer__]').as('emptyDropTarget');
        cy.contains('Соберите бургер');
        cy.contains('Начните собирать бургер!');
        cy.get('[id="sauce"] > ul > li > [class^=common_link__]').first().as('sauce');

        cy.get('@bun')
            .drag('@emptyDropTarget');

        cy.get('@bun')
            .find('h3')
            .invoke('text')
            .then((expectedText) => {
                cy.get('[class^=burger-constructor_topBun__]')
                    .find('[class=constructor-element__text]')
                    .invoke('text')
                    .then((actualText) => {
                        expect(actualText).to.equal(`${expectedText} (верх)`);
                    });
                cy.get('[class^=burger-constructor_bottomBun__]')
                    .find('[class=constructor-element__text]')
                    .invoke('text')
                    .then((actualText) => {
                        expect(actualText).to.equal(`${expectedText} (низ)`);
                    });
            });

        cy.get('[class^=burger-constructor_container__]').as('dropTarget');

        cy.get('@sauce')
            .drag('@dropTarget');

        cy.contains('Оформить заказ')
            .should('be.visible')
            .and('not.be.disabled')
            .click();

        cy.wait('@createOrder').its('response.statusCode').should('eq', 200);

        cy.contains('Ваш заказ начали готовить');

        cy.get('[class^=modal_closeButton__]').click();

        cy.contains('Ваш заказ начали готовить').should('not.exist');
    });

    it('should open modal with ingredient details when clicking on ingredient card', () => {
        cy.get('[id="bun"] > ul > li > [class^=common_link__]').first().as('bun');
        cy.get('@bun').click();
        cy.contains('Детали ингредиента');

        cy.get('@bun')
            .find('h3')
            .invoke('text')
            .then((bunName) => {
                cy.get('[class^=modal_modal__]')
                    .find('h1')
                    .invoke('text')
                    .then((actualName) => {
                        expect(actualName).to.equal(bunName);
                    });
            });

        cy.get('[class^=modal_closeButton__]').click();
        cy.contains('Детали ингредиента').should('not.exist');
    });

    it('should remove ingredients from constructor', () => {
        cy.get('[id="bun"] > ul > li > [class^=common_link__]').first().as('bun');
        cy.get('[id="sauce"] > ul > li > [class^=common_link__]').first().as('sauce');
        cy.get('[class^=burger-constructor_emptyContainer__]').as('emptyDropTarget');

        cy.get('@bun').drag('@emptyDropTarget');

        cy.get('[class^=burger-constructor_container__]').as('dropTarget');

        cy.get('@sauce').drag('@dropTarget');

        cy.get('@dropTarget')
            .find('ul > li > div')
            .as('ingredients');

        cy.get('@ingredients').contains('Соус Spicy-X');

        cy.get('@ingredients').eq(0)
            .find('[class^=constructor-element__action]')
            .click();

        cy.get('@ingredients').should('not.exist');
    });
});
