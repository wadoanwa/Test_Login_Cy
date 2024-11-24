///<reference types="cypress"/>

describe('Login Feature', () => {
    // Test untuk login dengan kredensial Valid
    it('User Login With Valid Credentials', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'),
        cy.get('h5').contains('Login').should('have.text','Login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('[type="submit"]').click();
        cy.get('h6').contains('Dashboard').should('have.text','Dashboard');    
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

    it('Display the dashboard after successful login', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'),
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('[type="submit"]').click();
        cy.get('h6').contains('Dashboard').should('have.text','Dashboard');
        cy.get('.oxd-chart-legend').should('be.visible'); // chart legend nampak
    });

       
})