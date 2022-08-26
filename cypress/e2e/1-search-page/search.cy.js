/// <reference types="cypress" />

describe('Searchbar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('has a funcational searchbar', () => {
    cy.get('.MuiInputBase-input.MuiInput-input')
      .type('chocolate')
      .should('have.value', 'chocolate')
      .clear()
      .should('have.value', '')
  })

  it('updates the term query params', () => {
    cy.get('.MuiInputBase-input.MuiInput-input')
      .type('chocolate')
      .should('have.value', 'chocolate')
    cy.url().should('include', 'term=chocolate');
  })

  it('can search', () => {
    cy.get('input.MuiInputBase-input.MuiInput-input').type('c')
    cy.get('button.MuiButtonBase-root').click()

    cy.get('ul.MuiList-root a.MuiListItem-root').should('have.length.greaterThan', 0)
  })
})
