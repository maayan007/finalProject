import {Email, invalidEmails, Pages, testerLocators} from "./poms";
import {uniqueEmail} from "./common";

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
    I.amOnPage(Pages.Registration);
    I.fillField(testerLocators.registration.firstName,"Maayan")
    I.fillField(testerLocators.registration.lastName,"Testing")
    I.fillField('Email', Email.ValidaRegistered);
    I.fillField('Password', 'password123');
    I.click(testerLocators.general.submitButton);
    I.seeElement(locate(testerLocators.registration.error).withText('Email address is already in use'));
});

Scenario('Invalid email and password', ({ I }) => {
    I.amOnPage(Pages.Registration);
    I.fillField(testerLocators.registration.firstName,"Maayan")
    I.fillField(testerLocators.registration.lastName,"Testing")
    I.fillField('Email', uniqueEmail);
    I.fillField('Password', '123');
    I.click(testerLocators.general.submitButton);
    I.seeElement(locate(testerLocators.registration.error).withText
    ('User validation failed: password: Path `password` (`123`) is shorter than the minimum allowed length (7).'));
});

Scenario('Email must contain exactly one "@" and not be at the start or end', ({ I }) => {

    invalidEmails.forEach(email => {
        I.amOnPage(Pages.Registration);
        I.fillField(testerLocators.registration.firstName, "Maayan");
        I.fillField(testerLocators.registration.lastName, "Testing");
        I.fillField(testerLocators.registration.email, email);
        I.fillField(testerLocators.registration.password, 'password123');
        I.click(testerLocators.general.submitButton);
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