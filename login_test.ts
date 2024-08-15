import {Email, Pages, testerLocators} from "./poms";
import {fillAndSubmit} from "./common";

Feature('Login');

Scenario('Invalid username or password should not allow login', ({ I }) => {
    I.amOnPage(Pages.Login);

    fillAndSubmit('user@example.com', 'wrong password');
    I.seeElement(locate(testerLocators.registration.error).withText('Incorrect username or password'));

    fillAndSubmit('wronguser@example.com', 'password123');
    I.seeElement(locate(testerLocators.registration.error).withText('Incorrect username or password'));
});

Scenario('Successful login should navigate to the correct account', async ({ I }) => {

    I.amOnPage(Pages.Login);
    fillAndSubmit( Email.ValidaRegisteredOptionTwo, '1234567');
    I.seeInCurrentUrl(Pages.ContactList);
});