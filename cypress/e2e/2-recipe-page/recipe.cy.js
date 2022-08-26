/// <reference types="cypress" />

describe('Recipe', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Can render a recipe page', () => {
    cy.get('button.MuiButtonBase-root').click()
    cy.get('.MuiListItem-root.MuiListItem-gutters').eq(0).click()
  })

  it('Can go back to search', () => {
    cy.get('button.MuiButtonBase-root').click()
    cy.get('.MuiListItem-root.MuiListItem-gutters').eq(0).click()

    cy.get('.MuiTypography-root.MuiLink-root').click()
  })
})
