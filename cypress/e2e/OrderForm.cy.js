describe('Order Form', () => {
  beforeEach(() => {
    cy.intercept('GET', "http://localhost:3001/api/v1/orders", {fixture: 'orders.json'})
    cy.intercept('POST', "http://localhost:3001/api/v1/orders", {fixture: 'newOrder.json'})
    cy.visit("http://localhost:3000");
  });

  it('Upon page load a user should see', () =>{
    cy.get('h1').should('exist', 'Burrito Builder')
    cy.get('input[name="name"]').should('exist')
    cy.get('button[name="beans"]').should('exist')
    cy.get('button[name="steak"]').should('exist')
    cy.get('button[name="carnitas"]').should('exist')
    cy.get('button[name="sofritas"]').should('exist')
    cy.get('button[name="lettuce"]').should('exist')
    cy.get('button[name="queso fresco"]').should('exist')
    cy.get('button[name="pico de gallo"]').should('exist')
    cy.get('button[name="hot sauce"]').should('exist')
    cy.get('button[name="guacamole"]').should('exist')
    cy.get('button[name="jalapenos"]').should('exist')
    cy.get('button[name="cilantro"]').should('exist')
    cy.get('button[name="sour cream"]').should('exist')
    cy.get('.order').should("have.length", 3)
  })

  it('should see a new order submitted on the page', () => {
    cy.get('input[name="name"]').type("Isaiah R");
    cy.get('button[name="beans"]').click();
    cy.get('button[name="steak"]').click();
    cy.get('button[name="lettuce"]').click();
    cy.get('button[name="submit-order"]').should("be.enabled");
    cy.get('button[name="submit-order"]').click();
    cy.get('.order').last()
    cy.get('.order-name').last().should('have.text', 'Isaiah R');
    cy.get('.ingredient-list').last().should('have.text', 'beanssteaklettuce');
  })

  it("Submit button is disabled by default and if there are no ingriedients", () => {
    cy.get('input[name="name"]').clear();
    cy.get('button[name="submit-order"]').should("be.disabled");
    cy.get('input[name="name"]').type("Isaiah R");
    cy.get('button[name="submit-order"]').should("be.disabled");
  });
  
  it("should disable the submit button if there is no name", () => {
    cy.get('input[name="name"]').type("Isaiah R");
    cy.get('button[name="beans"]').click();
    cy.get('button[name="steak"]').click();
    cy.get('button[name="lettuce"]').click();
    cy.get('input[name="name"]').clear();
    cy.get('button[name="submit-order"]').should("be.disabled");
})
})