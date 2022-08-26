/// <reference types="cypress" />

describe('Ingredients', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('list can be checked', () => {
    cy.get('.MuiFormControlLabel-root').should('have.length.greaterThan', 0)
  })

  it('updates the ingredients query params', () => {
    cy.url().should('include', 'ingredients=');
    // check each checkbox is in the query param
    cy.get('.MuiFormControlLabel-root').each((item) => {
      const checkbox = cy.wrap(item)
      checkbox.find('.MuiTypography-root').invoke('text').then((text) => {
        cy.url().should('include', text);
      });
    });

    // remove all checkboxes
    cy.get('.MuiFormControlLabel-root').each((item) => {
      cy.wrap(item).click()
    });
    // check all are removed
    cy.get('.MuiFormControlLabel-root').each((item) => {
      const checkbox = cy.wrap(item)
      checkbox.find('.MuiTypography-root').invoke('text').then((text) => {
        cy.url().should('not.include', text);
      });
    });
  })

  it('should have results when selected', () => {
    cy.get('button.MuiButtonBase-root').click()
    cy.get('ul.MuiList-root a.MuiListItem-root').should('have.length.greaterThan', 0)
  })

  it('no results when unchecked', () => {
    cy.get('.MuiFormControlLabel-root').each((item) => {
      cy.wrap(item).click()
    });
    cy.get('button.MuiButtonBase-root').click()
    cy.get('ul.MuiList-root a.MuiListItem-root').should('have.length', 0)
  })
})
