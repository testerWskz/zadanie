/// <reference types="cypress" />
var assert = require("assert")
const { Console } = require("console")

const customers = [
    {
      id: 1,
      name: 'Jan Testowy'
    },
    {
      id: 2,
      name: 'Paweł Testowy'
    },
    {
      id: 3,
      name: 'Wojtek Testowy'
      }
  ]
const testName = 'Mariusz Testowy'
const updatedTestName = 'Mariusz NieTestowy'

describe('customers api testing', () => {
    it('Get all customer - GET', () => {
        cy.request('/api/customers').as('getRequest');
        cy.get('@getRequest').then(response => {
            expect(response.status).to.eq(200)
            //mocha assert
            assert.equal(response.status, 200)
            console.log(response.body.length)
            response.body.forEach((customer, index) => {
                expect(customer.id).to.equal(customers[index].id)
                expect(customer.name).to.equal(customers[index].name)
            })
        })
    })

    it('Get one customer - GET', () => {
        cy.request('/api/customers/1').as('getRequest');
        cy.get('@getRequest').then(response => {
            expect(response.status).to.eq(200)

            expect(response.body["id"]).to.eq(customers[0].id)
            expect(response.body["name"]).to.eq(customers[0].name)
        })
    })

    it('Add customer - POST', () => {
        cy.request('POST', '/api/customers/', { name: `${testName}`}).as('postRequest');
        cy.get('@postRequest').then(response => {
            console.log(response)
            expect(response.status).to.eq(200);
            expect(response.body).to.eq('Dodano klienta')
        })
    })

    it('Update customer - PUT', () => {
        cy.request('PUT', `/api/customers/4`, { name: `${updatedTestName}` }).as('putRequest');
        cy.get('@putRequest').then(response => {
            expect(response.status).to.eq(200)
            expect(response.body).to.eq('Zaktualizowano klienta')
        })
    })

    it('Delete customer - DELETE', () => {
        cy.request('DELETE', `/api/customers/4`).as('deleteRequest');
        cy.get('@deleteRequest').then(response => {
            expect(response.status).to.eq(200)
            expect(response.body).to.eq('Usunięto klienta')
        })
    })
 })