import { faker } from "@faker-js/faker";

describe('Login', () => {

  beforeEach("load fixture", function () {
    cy.fixture("login").then((data) => {
      this.data = data;
    })
    cy.acessarSite()
  })
  it('Test Case 1: Register User', function () {

    //4. Click on 'Signup / Login' button
    //5. Verify 'New User Signup!' is visible    
    cy.acessarMenu(this.data.elements["signup-login-button"], 'New User Signup!')

    //6. Enter name and email address
    cy.get(this.data.elements["signup-name"]).type(this.data.inputs["name"])
      .get(this.data.elements["signup-email"]).type(faker.internet.email({ firstName: 'TesteQA' }))

    //7. Click 'Signup' button 
    cy.get(this.data.elements["signup-button"]).click()

    //8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    cy.contains('Enter Account Information').should('be.visible')

    //9. Fill details: Title, Name, Email, Password, Date of birth
    cy.get(this.data.elements["signup-title-mr"]).click()
      .get(this.data.elements["signup-password"]).type(this.data.inputs["password"])
      .get(this.data.elements["signup-days"]).select(this.data.inputs["days"])
      .get(this.data.elements["signup-months"]).select(this.data.inputs["months"])
      .get(this.data.elements["signup-years"]).select(this.data.inputs["years"])

    //10. Select checkbox 'Sign up for our newsletter!'
    //11. Select checkbox 'Receive special offers from our partners!'
    cy.get(this.data.elements["signup-checkbox01"]).check()
      .get(this.data.elements["signup-checkbox02"]).check()

    //12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    cy.get(this.data.elements["signup-first-name"]).type(faker.person.firstName())
      .get(this.data.elements["signup-last-name"]).type(faker.person.lastName())
      .get(this.data.elements["signup-company"]).type(faker.company.name())
      .get(this.data.elements["signup-address1"]).type(faker.location.streetAddress())
      .get(this.data.elements["signup-address2"]).type(faker.location.streetAddress())
      .get(this.data.elements["signup-country"]).select(this.data.inputs["country"])
      .get(this.data.elements["signup-state"]).type(faker.location.state())
      .get(this.data.elements["signup-city"]).type(faker.location.city())
      .get(this.data.elements["signup-zipcode"]).type(faker.location.zipCode())
      .get(this.data.elements["signup-mobile-number"]).type(faker.phone.number("national"))

    //13. Click 'Create Account button'
    //14. Verify that 'ACCOUNT CREATED!' is visible
    //15. Click 'Continue' button
    //16. Verify that 'Logged in as username' is visible
    cy.get(this.data.elements["signup-create-account"]).click()
      .get('.text-center').then(sucess => {
        expect(sucess.text()).to.equal('Account Created!');
      });

    cy.get(this.data.elements["signup-continue-button"]).click()
      .get('a > b').then(sucess => {
        expect(sucess.text()).contains(this.data.inputs["name"]);
      });

    //17. Click 'Delete Account' button
    //18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    cy.contains(' Delete Account').click()
      .get('.text-center').then(sucess => {
        expect(sucess.text()).to.equal('Account Deleted!');
      });
    cy.get(this.data.elements["signup-continue-button"]).click()
  })

  it('Test Case 2: Login User with correct email and password', function () {
    cy.cadastrarConta(this.data)
    cy.contains("Logout").click()
    //Enter correct email address and password
    //Click 'login' button
    //Verify that 'Logged in as username' is visible
    cy.get(this.data.elements["login-password"]).type(this.data.inputs["password"])
      .get(this.data.elements["login-email"]).type(this.data.inputs["email"])
      .get(this.data.elements["login-button"]).click()

    cy.get('a > b').then(sucess => {
      expect(sucess.text()).contains(this.data.inputs["name"]);
    });
    cy.deletarConta(this.data)
  })

})

