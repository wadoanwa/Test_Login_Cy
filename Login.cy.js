import LoginPage from "../../../POM/Login/POMLogin.cy";


describe('Login Feature', () => {
    // Test untuk login dengan kredensial Valid
    it('User Login With Valid Credentials', () => {
        // Kunjungi halaman login
        LoginPage.visit();
        LoginPage.verifyLoginPage().should('have.text','Login');
        LoginPage.inputUserName().type('Admin');
        LoginPage.inputPassword().type('admin123');
        cy.intercept('get','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionsummury')
        LoginPage.ButtonLogin().click();
        cy.wait('@actionsummury');
        LoginPage.DasboardLogin().should('have.text','Dashboard');    
    });
        
    it('Intercept Display the dashboard after successful login', () => {
        // Kunjungi halaman login
        LoginPage.visit();
        LoginPage.verifyLoginPage().should('have.text','Login');
        LoginPage.inputUserName().type('Admin');
        LoginPage.inputPassword().type('admin123');

        // intercept request dashboard (atau data lain setelah login)
        cy.intercept('GET','**/action-summary').as('actionsummury');
        cy.intercept('GET','**/subunit').as('subunit');
        cy.intercept('GET','**/dashboard/employees/locations').as('locations');
        LoginPage.ButtonLogin().click();

        // Tunggu untuk request ke login endpoint
        cy.wait('@actionsummury'); 
        cy.wait('@subunit');
        cy.wait('@locations');
        LoginPage.DasboardLogin().should('have.text','Dashboard');
        cy.get('.oxd-chart-legend').should('be.visible'); // chart legend nampak
    }); 

    it('intercept login request dashboard', () => {
                    
        // Kunjungi halaman login
        LoginPage.visit();
        LoginPage.verifyLoginPage().should('have.text','Login');
    
        // Isi form login
        LoginPage.inputUserName().type('Admin');
        LoginPage.inputPassword().type('admin123');
    
        // intercept request dashboard (atau data lain setelah login)
        cy.intercept('GET', '/web/index.php/dashboard/index').as('dashboardRequest');

        // Kirim form login
        LoginPage.ButtonLogin().click();
    
        // Tunggu untuk request dashboard dan pastikan data tersedia
        cy.wait('@dashboardRequest').its('response.statusCode').should('eq', 200);
    
        // Memastikan elemen-elemen di dashboard muncul setelah login
        LoginPage.DasboardLogin().should('have.text','Dashboard');
        cy.get('.oxd-topbar').should('exist'); // contoh elemen dashboard
    });

     // Test untuk login dengan kredensial yang salah
    it('Test Login : User name Valid dan Passsword invalid', () => {
        // Mengunjungi halaman Login
        LoginPage.visit();
        LoginPage.verifyLoginPage().should('have.text','Login');

        // Mengisi form login dengan User Name benar dan Passwaord yang salah
        LoginPage.inputUserName().type('Admin');  // Input username Benar
        LoginPage.inputPassword().type('passwordsalah');  // Input password salah
        LoginPage.ButtonLogin().click();  // Klik tombol login
        // Pastikan pesan error muncul
        LoginPage.KredensialMessage();
    });

    // Test untuk login dengan kredensial yang salah
    it('Test Login : User name invalid dan Passsword Valid', () => {
        // Mengunjungi halaman Login
        LoginPage.visit();
        LoginPage.verifyLoginPage().should('have.text','Login');

        // Mengisi form login dengan User Name Salah dan Passwaord Benar
        LoginPage.inputUserName().type('Adminxxx');  // Input username salah
        LoginPage.inputPassword().type('admin123');  // Input password Benar
        LoginPage.ButtonLogin().click();  // Klik tombol login
        // Pastikan pesan error muncul
        LoginPage.KredensialMessage();
    });

    // Test untuk login dengan kredensial yang salah
    it('Test Login : User Name dan Passsword Invalid', () => {
        // Mengunjungi halaman Login
        LoginPage.visit();
        LoginPage.verifyLoginPage().should('have.text','Login');

        // Mengisi form login dengan User Name dan Passwaord yang salah
        LoginPage.inputUserName().type('usersalah');  // Input username salah
        LoginPage.inputPassword().type('passwordsalah');  // Input password salah
        LoginPage.ButtonLogin().click();  // Klik tombol login
        // Pastikan pesan error muncul
        LoginPage.KredensialMessage();
    });

    // Test untuk login dengan User Benar dan Password kosong
    it('Test Login : User Name Benar and Passsword kosong', () => {
        // Mengunjungi halaman Login
        LoginPage.visit();
        LoginPage.verifyLoginPage().should('have.text','Login');

        // Mengisi form login dengan User Name benar dan Passwaord Kosong
        LoginPage.inputUserName().type('Admin');  // Input username benar
        LoginPage.ButtonLogin().click();  // Klik tombol login
        // Pastikan pesan error muncul
        LoginPage.BlankMessage();
    });

     // Test untuk login dengan User Name Kosong dan Password Benar
    it('Test Login : User Name Kosong and Passsword Benar', () => {
        // Mengunjungi halaman Login
        LoginPage.visit();
        LoginPage.verifyLoginPage().should('have.text','Login');

        // Mengisi form login dengan User Name Kosong dan Passwaord Benar
        LoginPage.inputPassword().type('admin123');  // Input password benar
        LoginPage.ButtonLogin().click();  // Klik tombol login
        // Pastikan pesan error muncul
        LoginPage.BlankMessage();
    });

    // Test untuk login dengan User Name dan Password Kosong
    it('Test Login : User Name and Passsword Kosong', () => {
        // Mengunjungi halaman Login
        LoginPage.visit();
        LoginPage.verifyLoginPage().should('have.text','Login');

        // Mengisi form login dengan User dan Passwaord Kosong
        LoginPage.ButtonLogin().click();  // Klik tombol login
        // Pastikan pesan error muncul
        LoginPage.BlankMessage();
    }); 

    it('Ke reset password page', () => {
        // Kunjungi halaman login
        LoginPage.visit();
        LoginPage.verifyLoginPage().should('have.text','Login');
        cy.contains('Forgot your password?').click();
        cy.url().should('include', '/requestPasswordResetCode');
    });

    
})