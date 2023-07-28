const email='maribard@gmail.com'
const password='aqLrvDJ348'
const country='Ukraine'
const hobby='Sports & Outdoors'
const foto='foto-kotek.jpg'
const additionalInfo='Mariusz nie ma kota'

describe('Tests related with registration', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/registration')
    })
  
    it('check registration with correct data', () => {
      cy.get('.form-group #username').type(`${email}`)
      cy.get('.form-group #password').type(`${password}`)
      cy.get('.form-group #country').select(`${country}`)
      cy.get('.form-group #hobby').select(`${hobby}`)
      
      cy.fixture(`${foto}`, { encoding: null }).as('fileFixture')
      cy.get('.form-group #photo').selectFile('@fileFixture')

      cy.get('.form-group #info').type(`${additionalInfo}`)
      cy.get('.form-check input[id="registration-consent-1"]').click()
      cy.get('.form-check input[id="registration-consent-3"]').click()
      cy.get('input[type="submit"]').click()
      cy.get('body').should('have.text', `Account created for: ${email}`)
    })
})