/// <reference types="cypress" />

describe('Recipe Not Found', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/#/sadf')
  })

  it('Can render not found page', () => {
    cy.get('.MuiTypography-root').should('contain.text', 'not found')
  })

  it('Can go back to search', () => {
    cy.get('.MuiTypography-root.MuiLink-root').click()
  })
})
