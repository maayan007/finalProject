import {Email, invalidEmails, Pages, testerLocators} from "./poms";
import {fillRegistrationForm, uniqueEmail} from "./common";

Feature('User Registration');

Scenario('Successful registration', async ({ I }) => {
    I.amOnPage(Pages.Registration);
    I.fillField(testerLocators.registration.firstName,"Maayan")
    I.fillField(testerLocators.registration.lastName,"Testing")
    I.fillField('Email', uniqueEmail);
    I.fillField('Password', 'password123');
    I.click(testerLocators.general.submitButton);
    const response = I.sendGetRequest(`/api/users/${uniqueEmail}`);
    console.log(response);
    I.seeResponseCodeIs(200);
});

Scenario('Registration with existing email', async ({ I }) => {
    await fillRegistrationForm("Maayan", "Testing", Email.ValidaRegistered, "password123");
    I.seeElement(locate(testerLocators.registration.error).withText('Email address is already in use'));
});

Scenario('Email must contain exactly one "@" and not be at the start or end', ({ I }) => {

    invalidEmails.forEach(async email => {
        await fillRegistrationForm("Maayan", "Testing", email, "password123");
        I.seeElement(locate(testerLocators.registration.error).withText('User validation failed: email: Email is invalid'));
    });
});

Scenario('Cannot log in if all fields are not filled', ({ I }) => {
    I.amOnPage(Pages.Login);

    I.fillField(testerLocators.registration.email, '');
    I.fillField(testerLocators.registration.password, '');
    I.click(testerLocators.general.submitButton);
    I.seeElement(locate(testerLocators.registration.error).withText('Incorrect username or password'));
});
