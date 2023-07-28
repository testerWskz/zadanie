/// <reference types="cypress" />

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
    it('test - GET all customer', () => {
        cy.request('http://localhost:3000/api/customers').as('getRequest');
        cy.get('@getRequest').then(response => {
            expect(response.status).to.eq(200)
            response.body.forEach((customer, index) => {
                expect(customer.id).to.equal(customers[index].id)
                expect(customer.name).to.equal(customers[index].name)
            })
        })
    })

    it('test - GET one customer', () => {
        cy.request('http://localhost:3000/api/customers/1').as('getRequest');
        cy.get('@getRequest').then(response => {
            expect(response.status).to.eq(200)

            expect(response.body["id"]).to.eq(customers[0].id)
            expect(response.body["name"]).to.eq(customers[0].name)
        })
    })

    it('Add customer - POST', () => {
        cy.request('POST', '/api/customers/', { name: `${testName}`}).as('postRequest');
        cy.get('@postRequest').then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.eq('Dodano klienta')
        })
    })

    it('update customer - PUT', () => {
        cy.request('PUT', `/api/customers/4`, { name: `${updatedTestName}` }).as('putRequest');
        cy.get('@putRequest').then(response => {
            expect(response.status).to.eq(200)
            expect(response.body).to.eq('Zaktualizowano klienta')
        })
    })

    it('delete customer - DELETE', () => {
        cy.request('DELETE', `/api/customers/4`).as('deleteRequest');
        cy.get('@deleteRequest').then(response => {
            expect(response.status).to.eq(200)
            expect(response.body).to.eq('Usunięto klienta')
        })
    })
 })