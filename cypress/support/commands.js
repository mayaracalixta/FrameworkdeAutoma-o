import { faker } from "@faker-js/faker";

Cypress.Commands.add('acessarSite', () => {
    //1. Launch browser
    //2. Navigate to url 'http://automationexercise.com'
    cy.visit('/')
    //3. Verify that home page is visible successfully
    cy.contains('AutomationExercise').should('be.visible')
})

Cypress.Commands.add('acessarMenu', (item, text) => {
    cy.contains(item).click()
    cy.contains(text).should('be.visible')

})

Cypress.Commands.add('cadastrarConta', (data) => {
    //4. Click on 'Signup / Login' button
    //5. Verify 'New User Signup!' is visible    
    cy.acessarMenu(data.elements["signup-login-button"], 'New User Signup!')

    //6. Enter name and email address
    cy.get(data.elements["signup-name"]).type(data.inputs["name"])
        .get(data.elements["signup-email"]).type(data.inputs["email"])

    //7. Click 'Signup' button
    cy.get(data.elements["signup-button"]).click()

    //8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    cy.contains('Enter Account Information').should('be.visible')

    //9. Fill details: Title, Name, Email, Password, Date of birth
    cy.get(data.elements["signup-title-mr"]).click()
        .get(data.elements["signup-password"]).type(data.inputs["password"])
        .get(data.elements["signup-days"]).select(data.inputs["days"])
        .get(data.elements["signup-months"]).select(data.inputs["months"])
        .get(data.elements["signup-years"]).select(data.inputs["years"])

    //10. Select checkbox 'Sign up for our newsletter!'
    //11. Select checkbox 'Receive special offers from our partners!'
    cy.get(data.elements["signup-checkbox01"]).check()
        .get(data.elements["signup-checkbox02"]).check()

    //12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    cy.get(data.elements["signup-first-name"]).type(faker.person.firstName())
        .get(data.elements["signup-last-name"]).type(faker.person.lastName())
        .get(data.elements["signup-company"]).type(faker.company.name())
        .get(data.elements["signup-address1"]).type(faker.location.streetAddress())
        .get(data.elements["signup-address2"]).type(faker.location.streetAddress())
        .get(data.elements["signup-country"]).select(data.inputs["country"])
        .get(data.elements["signup-state"]).type(faker.location.state())
        .get(data.elements["signup-city"]).type(faker.location.city())
        .get(data.elements["signup-zipcode"]).type(faker.location.zipCode())
        .get(data.elements["signup-mobile-number"]).type(faker.phone.number("national"))

    //13. Click 'Create Account button'
    //14. Verify that 'ACCOUNT CREATED!' is visible
    //15. Click 'Continue' button
    //16. Verify that 'Logged in as username' is visible
    cy.get(data.elements["signup-create-account"]).click()
        .get('.text-center').then(sucess => {
            expect(sucess.text()).to.equal('Account Created!');
        });

    cy.get(data.elements["signup-continue-button"]).click()
        .get('a > b').then(sucess => {
            expect(sucess.text()).contains(data.inputs["name"]);
        });
})

Cypress.Commands.add('deletarConta', (data) => {
    cy.contains(data.elements["signup-delete-button"]).click()
        .get('.text-center').then(sucess => {
            expect(sucess.text()).to.equal('Account Deleted!');
        });
    cy.get(data.elements["signup-continue-button"]).click()

})