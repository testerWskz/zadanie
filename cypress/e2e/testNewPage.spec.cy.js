const href='https://www.wskz.pl'
const password='aqLrvDJ348'
const country='Ukraine'
const hobby='Sports & Outdoors'
const foto='foto-kotek.jpg'
const additionalInfo='Mariusz nie ma kota'

describe('Tests related with registration', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/new-page')
    })
  
    it('check href and info about student', () => {
      cy.get('.jumbotron a')
        .should('have.attr', 'href', `${href}`)
        .should('have.attr', 'target', '_blank')
        .then(link => {

            cy.request(link.prop('href'))
              .its('status')
              .should('eq', 200)
        })

      cy.visit(`${href}`)
      cy.origin(`${href}`, () => {
        cy.get('a[id="hs-eu-confirmation-button"]').click()
        cy.get('#comp-ils2cgqy2 > ul').invoke('show')
        .should('be.visible')
        .children()
        .contains('Samorząd studencki')
        .click()
        
        cy.get('div[id="comp-kz42x7vi"]').should('have.text', 'Samorząd studencki')

        cy.get('#comp-kz42x7vz__item1 span[class="wixui-rich-text__text"]')
          .contains('Tomasz Michalik')
        cy.get('#comp-kz42x7wp__item1').contains('- student II roku')

        cy.get('#comp-kz42x7wk__item-kf51ysxt span[class="wixui-rich-text__text"]')
          .contains('Dawid Małecki')
        cy.get('#comp-kz42x7wp__item-kf51ysxt').contains('- student III roku')

        cy.get('#comp-kz42x7wk__item-kf51yt5v span[class="wixui-rich-text__text"]')
          .contains('Paweł Barowicz')
        cy.get('#comp-kz42x7wp__item-kf51yt5v').contains('- student II roku')
      })
    })
})