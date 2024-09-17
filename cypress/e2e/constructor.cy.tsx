const BURGER_CONSTRUCTOR = '[data-cy="burger-constructor"]';
const BUN_TOP = '[data-cy="bun-top"]';
const BUN_BOTTOM = '[data-cy="bun-bottom"]';
const MODAL = '[data-cy="modal"]';
const MODAL_OVERLAY = `[data-cy="modal-overlay"]`;
const MODAL_CLOSE = '[data-cy="modal-close"]';
const ORDER_BUTTON = '[data-cy="orderButton"]';
const ORDER_NUMBER = '[data-cy="orderNumber"]';
const INGREDIENT_SELECTOR = '[data-cy="643d69a5c3f7b9001cfa0941"]';
const testUrl = 'http://localhost:4000';

describe('TEST e2e модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.visit(testUrl);
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('проверка модального окна: отсутствие', function () {
    cy.get('#modals').children().should('have.length', 0);
  });

  it('проверка модального окна: открытие', function () {
    cy.contains('Краторная булка N-200i').click();
    cy.get('#modals').children().should('have.length', 2);
    cy.get('#modals').contains('Краторная булка N-200i');
  });

  it('проверка модального окна: закрытие по кнопке', function () {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.get('#modals').find('button').click();
    cy.get('#modals').children().should('have.length', 0);
  });

  it('проверка модального окна: закрытие по esc', function () {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.get('body').type('{esc}');
    cy.get('#modals').children().should('have.length', 0);
  });

  it('проверка модального окна: закрытие по overlay click', function () {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.get(MODAL_OVERLAY).click({ force: true });
    cy.get('#modals').children().should('have.length', 0);
  });
});

describe('Test e2e Соберите бургер', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit(testUrl);
  });

  it('Добавление булок', function () {
    cy.get('[data-cy=ingredient-1]').within(() => {
      cy.get('button').click();
    });

    // Верхняя булка
    cy.get(BUN_TOP)
      .should('exist')
      .within(() => {
        cy.get('.constructor-element__text').as('constructorElementText');
        cy.get('@constructorElementText').should(
          'contain',
          'Краторная булка N-200i'
        );
      });

    // Нижняя булка
    cy.get(BUN_BOTTOM)
      .should('exist')
      .within(() => {
        cy.get('.constructor-element__text').as('constructorElementText');
        cy.get('@constructorElementText').should(
          'contain',
          'Краторная булка N-200i'
        );
      });
  });

  it('Добавление Ингредиентов', () => {
    cy.get('[data-cy=ingredient-2]').as('ingredient-2');
    cy.get('@ingredient-2').within(() => {
      cy.get('button').click();
    });
    cy.get('[data-cy=ingredient-3]').as('ingredient-3');
    cy.get('@ingredient-3').within(() => {
      cy.get('button').click();
    });

    cy.get('[data-cy="bun-ingredient-3"]')
      .should('exist')
      .within(() => {
        cy.get('.constructor-element__text').as('constructorElementText');
        cy.get('@constructorElementText').should(
          'contain',
          'Филе Люминесцентного тетраодонтимформа'
        );
      });

    cy.get('[data-cy="bun-ingredient-2"]')
      .should('exist')
      .within(() => {
        cy.get('.constructor-element__text').as('constructorElementText');
        cy.get('@constructorElementText').should(
          'contain',
          'Биокотлета из марсианской Магнолии'
        );
      });
  });
});

describe('Test e2e оформления заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('order');
    cy.visit(testUrl);
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Оформление заказа', () => {
    cy.get('[data-cy=ingredient-1]').within(() => {
      cy.get('button').click();
    });
    cy.log('Добавили булки');

    cy.get('[data-cy=ingredient-2]').within(() => {
      cy.get('button').click();
    });
    cy.log('Добавили ингредиент');

    cy.get(ORDER_BUTTON).click();
    cy.log('Нажали кнопку оформления заказа');

    cy.wait('@order')
      .its('request.body')
      .should('deep.equal', { ingredients: ['1', '2', '1'] });
    cy.log('Запрос на сервер выполнен');

    cy.get(ORDER_NUMBER).should('contain', '99999');

    cy.get(MODAL_CLOSE).click();
    cy.get(MODAL).should('not.exist');

    // Очистки конструктора
    cy.get(BURGER_CONSTRUCTOR).within(() => {
      cy.get('div').should('contain', 'Выберите булки');
      cy.get('ul').should('contain', 'Выберите начинку');
    });
  });
});
