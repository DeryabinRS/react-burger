/// <reference types="Cypress"/>

describe('App Component', () => {
    it('should visit', () => {
        cy.viewport(1300, 750)
        cy.visit('/login')
        cy.get('[class*=input_type_email]').type('deryabinrs@yandex.ru')
        cy.get('[class*=input_type_password]').type('qweqweqwe')
        cy.get('[type=submit]').click()
    })

    it('open modal ingredient', () => {
        cy.viewport(1300, 750)
        cy.get('[class^=burger-ingredients_wrapper]').first().as('ingredientsList');
        cy.get('@ingredientsList').find('[class^=ingredients-card_card]').first().click();
        cy.get('[class^=modal_btn_close]').click();
    })

    it('drop and down ingredient card', () => {
        cy.viewport(1300, 750)

        cy.get('[class^=burger-ingredients_wrapper]').first().as('ingredientsList');
        cy.get('@ingredientsList').find('[class^=ingredients-card_card]').first().as('bun');

        const dataTransfer = new DataTransfer();
        cy.get('@bun').trigger('dragstart',{dataTransfer})
        cy.get('[class*=burger-constructor_wrapper]').trigger('drop', {dataTransfer})

        cy.get('@ingredientsList').find('[class^=ingredients-card_card]').last().as('ingredient_1')
        cy.get('@ingredient_1').trigger('dragstart',{dataTransfer})
        cy.get('[class*=burger-constructor_wrapper]').trigger('drop', {dataTransfer})
    })

    it('create order', () => {
        cy.viewport(1300, 750)
        cy.get('[class*=button_button]').click()
        cy.get('[class^=modal_btn_close]').click();
    })

    it('show feed page', () => {
        cy.visit('/feed')
    })
})