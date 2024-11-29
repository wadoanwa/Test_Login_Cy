/// <reference types="cypress" />

describe('Reqres API Testing', () => {
    //GET LIST USER
    it(' 1. Test API GET List User', () => {
        cy.request('GET', 'https://reqres.in/api/users?page=2')
          .then((response) => {
            expect(response.status).to.eq(200) // Verifikasi status 200 OK
            expect(response.body).to.not.be.null // Respons body harus berisi data dan tidak kosong
            expect(response.body.data).to.be.an('array'); // Verifikasi data adalah array
            expect(response.body.page).to.eq(2); // Halaman Kedua
          })  
    })

    // GET SINGLE USER
    it(' 2. Test API GET Single User',() => {
        cy.request('GET', 'https://reqres.in/api/users/2')
          .then((response) => {
            expect(response.status).to.eq(200); // Verifikasi status 200 OK
            expect(response.body).to.not.be.null; // Respons body harus berisi data dan tidak kosong
            expect(response.body.data).to.have.property('id', 2);  // Verifikasi ID user
            expect(response.body.data).to.have.property('first_name'); // Verifikasi nama depan
            expect(response.body.data).to.have.property('last_name'); // Verifikasi nama belakang
          })  
    })

    // GET SINGLE USER NOT FOUND
    it(' 3. Test API GET Single User not found id 23', () => {
        cy.request({method: 'GET', url: 'https://reqres.in/api/users/23',
        failOnStatusCode: false }) // Jangan gagal jika status code 404
        .then((response) => {
        expect(response.status).to.eq(404); // Verifikasi status code adalah 404
        expect(response.body).to.empty; // Respons body harus kosong
      });
    });   

    // GET LIST RESOURCE
    it(' 4. Test API GET List Resource',() => {
        cy.request('GET', 'https://reqres.in/api/unknown')
          .then((response) => {
            expect(response.status).to.eq(200); // Verifikasi status 200 OK
            expect(response.body).to.not.be.null; // Respons body harus berisi data dan tidak kosong
          })  
    })

    // GET SINGLE RESOURCE
    it(' 5. Test API GET Single Resource',() => {
        cy.request('GET', 'https://reqres.in/api/unknown/2')
          .then((response) => {
            expect(response.status).to.eq(200); // Verifikasi status 200 OK
            expect(response.body).to.not.be.null // Respons body harus berisi data dan tidak kosong
          })  
    })

    // POST CREATE USER
    it(' 6. Test API POST Create User',() => {
        const requestBody = {
                name: 'Wahyu',
                job: 'Leader'
        };
        let userId;
        cy.request('POST', 'https://reqres.in/api/users', requestBody).then((response) => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(201); // Verifikasi status 201 created
            expect(response.body).to.not.be.null; // Respons body harus berisi data dan tidak kosong
            expect(response.body.name).to.equal(requestBody.name);
            expect(response.body.job).to.equal(requestBody.job);
            userId = response.body.id; // Menyimpan ID user yang baru dibuat
          })  
    })

    // PUT UPDATE USER
    it(' 7. Test API PUT Update User',() => {
        const requestBody = {
                name: 'Wahyu',
                job: 'Leader'
        };
        cy.request('PUT', 'https://reqres.in/api/users/2', requestBody).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.not.be.null;
            expect(response.body.name).to.equal(requestBody.name);
            expect(response.body.job).to.equal(requestBody.job);
          })  
    })
  
    // DELETE USER
    it(' 8. Test API Delete User',() => {
        cy.request('DELETE', 'https://reqres.in/api/users/2')
          .then((response) => {
            expect(response.status).to.eq(204)
          })  
    })

    // POST REGISTER-SUCCESSFUL
    it(' 9. Test API POST Register a new user Successful', () => {
      const registrationData = {
        email: 'eve.holt@reqres.in',
        password: 'pistol'
      };
      
      cy.request('POST', 'https://reqres.in/api/register', registrationData)
        .then((response) => {
          expect(response.status).to.eq(200); // Mengharapkan status 200 OK
          expect(response.body.id).to.not.be.null; // Verifikasi ID yang terdaftar
          expect(response.body.token).to.not.be.null; // Verifikasi token
        });
    });

    // POST LOGIN-SUCCESSFUL
    it('10. Test API POST login valid credential succeessful', () => {
      const kredential = {
        email: 'eve.holt@reqres.in',
        password: 'pistol'
      };
      
      cy.request('POST', 'https://reqres.in/api/register', kredential)
        .then((response) => {
          expect(response.status).to.eq(200); // Mengharapkan status 200 OK
          expect(response.body.token).to.not.be.null; // Verifikasi token
        });
    });

})