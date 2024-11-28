/// <reference types="cypress" />

describe('Reqres API Testing', () => {
    //GET LIST USER
    it('Test API GET List User', () => {
        cy.request('GET', 'https://reqres.in/api/users?page=2')
          .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
          })  
    })

    // GET SINGLE USER
    it('Test API GET Single User',() => {
        cy.request('GET', 'https://reqres.in/api/users/2')
          .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
          })  
    })

   
    // GET LIST RESOURCE
    it('Test API GET List Resource',() => {
        cy.request('GET', 'https://reqres.in/api/unknown')
          .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
          })  
    })

    // GET SINGLE RESOURCE
    it('Test API GET Single Resource',() => {
        cy.request('GET', 'https://reqres.in/api/unknown/2')
          .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
          })  
    })

    // POST CREATE USER
    it('Test API POST Create User',() => {
        const requestBody = {
                name: 'Wahyu',
                job: 'Leader'
        };
        cy.request('POST', 'https://reqres.in/api/users', requestBody).then((response) => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(201);
            expect(response.body).to.not.be.null;
            expect(response.body.name).to.equal(requestBody.name);
            expect(response.body.job).to.equal(requestBody.job);
          })  
    })

    // PUT UPDATE USER
    it('Test API PUT Update User',() => {
        const requestBody = {
                name: 'Wahyu',
                job: 'Leader'
        };
        cy.request('PUT', 'https://reqres.in/api/users/2', requestBody).then((response) => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(200);
            expect(response.body).to.not.be.null;
            expect(response.body.name).to.equal(requestBody.name);
            expect(response.body.job).to.equal(requestBody.job);
          })  
    })

    // DELETE USER
    it('Test API Delete User',() => {
        cy.request('DELETE', 'https://reqres.in/api/users/2')
          .then((response) => {
            expect(response.status).to.eq(204)
            expect(response.body).to.not.be.null
          })  
    })


})