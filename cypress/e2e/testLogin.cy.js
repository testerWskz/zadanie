const username='jan.testowy@wskz.pl'
const password='aqLrvDJ348'

const wrongUsername='jan.nietestowy@wskz.pl'
const wrongPassword='aqLrvDJ349'

describe('Tests related with login', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('check login with correct data', () => {
      cy.get('#username').type(`${username}`)
      cy.get('#password').type(`${password}`)
      cy.get('.login [value="Login"]').click()
  
      cy.get('body').should('have.text', `Welcome back, ${username}!`)
    })

    it('check login with incorrect data', () => {
      cy.get('#username').type(`${wrongUsername}`)
      cy.get('#password').type(`${wrongPassword}`)
      cy.get('.login [value="Login"]').click()
  
      cy.get('body').should('have.text', 'Incorrect Username and/or Password!')
    })
})