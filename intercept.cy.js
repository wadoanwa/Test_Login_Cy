describe('Login Feature', () => {
    // Test untuk login dengan kredensial Valid
    it('User Login With Valid Credentials', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'),
        cy.get('h5').contains('Login').should('have.text','Login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.intercept('get','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionsummury')
        cy.get('[type="submit"]').click();
        cy.wait('@actionsummury');
        cy.get('h6').contains('Dashboard').should('have.text','Dashboard');    
    });
        
    it('Intercept Display the dashboard after successful login', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'),
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');

        // intercept request dashboard (atau data lain setelah login)
        cy.intercept('GET','**/action-summary').as('actionsummury');
        cy.intercept('GET','**/subunit').as('subunit');
        cy.intercept('GET','**/dashboard/employees/locations').as('locations');
        cy.get('[type="submit"]').click();

        // Tunggu untuk request ke login endpoint
        cy.wait('@actionsummury'); 
        cy.wait('@subunit');
        cy.wait('@locations');
        cy.get('h6').contains('Dashboard').should('have.text','Dashboard');
        cy.get('.oxd-chart-legend').should('be.visible'); // chart legend nampak
    }); 

    it('intercept login request dashboard', () => {
                    
        // Kunjungi halaman login
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    
        // Isi form login
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
    
        // intercept request dashboard (atau data lain setelah login)
        cy.intercept('GET', '/web/index.php/dashboard/index').as('dashboardRequest');

        // Kirim form login
        cy.get('button[type="submit"]').click();
    
        // Tunggu untuk request dashboard dan pastikan data tersedia
        cy.wait('@dashboardRequest').its('response.statusCode').should('eq', 200);
    
        // Memastikan elemen-elemen di dashboard muncul setelah login
        cy.get('.oxd-topbar').should('exist'); // contoh elemen dashboard
    });

     // Test untuk login dengan kredensial yang salah
    it('Test Login : User name Valid dan Passsword invalid', () => {
        // Mengisi form login dengan kredensial User benar dan Passwaord yang salah
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'),
        cy.get('h5').contains('Login').should('have.text','Login');
        cy.get('[name="username"]').type('Admin');  // Input username Benar
        cy.get('[name="password"]').type('passwordsalah');  // Input password salah
        cy.get('[type="submit"]').click();  // Klik tombol login
        // Pastikan pesan error muncul
        cy.get('.oxd-alert').should('contain', 'Invalid credentials');
    });

    // Test untuk login dengan kredensial yang salah
    it('Test Login : User name invalid dan Passsword Valid', () => {
        // Mengisi form login dengan kredensial User Salah dan Password Benar yang salah
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'),
        cy.get('h5').contains('Login').should('have.text','Login');
        cy.get('[name="username"]').type('Adminxxx');  // Input username salah
        cy.get('[name="password"]').type('admin123');  // Input password Benar
        cy.get('[type="submit"]').click();  // Klik tombol login
        // Pastikan pesan error muncul
        cy.get('.oxd-alert').should('contain', 'Invalid credentials');
    });

    // Test untuk login dengan kredensial yang salah
    it('Test Login : User Name dan Passsword Invalid', () => {
        // Mengisi form login dengan kredensial User Salah dan Password Benar yang salah
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'),
        cy.get('h5').contains('Login').should('have.text','Login');
        cy.get('[name="username"]').type('usersalah');  // Input username salah
        cy.get('[name="password"]').type('passwordsalah');  // Input password salah
        cy.get('[type="submit"]').click();  // Klik tombol login
        // Pastikan pesan error muncul
        cy.get('.oxd-alert').should('contain', 'Invalid credentials');
    });

    // Test untuk login dengan User Benar dan Password kosong
    it('Test Login : User Name Benar and Passsword kosong', () => {
        // Mengisi form login dengan kredensial User Benara dan Password  Kosong
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'),
        cy.get('h5').contains('Login').should('have.text','Login');
        cy.get('[name="username"]').type('Admin');  // Input username benar
        cy.get('[type="submit"]').click();  // Klik tombol login
        // Pastikan pesan error muncul
        cy.get('.oxd-text').should('contain', 'Required');
    });

     // Test untuk login dengan User Name Kosong dan Password Benar
    it('Test Login : User Name Kosong and Passsword Benar', () => {
        // Mengisi form login dengan kredensial User Benara dan Password  Kosong
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'),
        cy.get('h5').contains('Login').should('have.text','Login');
        cy.get('[name="password"]').type('admin123');  // Input password benar
        cy.get('[type="submit"]').click();  // Klik tombol login
        // Pastikan pesan error muncul
        cy.get('.oxd-text').should('contain', 'Required');
    });

    // Test untuk login dengan User Name dan Password Kosong
    it('Test Login : User Name and Passsword Kosong', () => {
        // Mengisi form login dengan kredensial User Benara dan Password  Kosong
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'),
        cy.get('h5').contains('Login').should('have.text','Login');
        cy.get('[type="submit"]').click();  // Klik tombol login
        // Pastikan pesan error muncul
        cy.get('.oxd-text').should('contain', 'Required');
    }); 

    it('Ke reset password page', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.contains('Forgot your password?').click();
        cy.url().should('include', '/requestPasswordResetCode');
    });

    
})
