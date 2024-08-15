import { Email, Pages, testerLocators} from "./poms";
import assert from "node:assert";
import {addMultipleContacts} from "./common";
const { I } = inject();


Feature('Contact List Management');

Scenario('Login and Verify Sequential Contact Additions', async ({ I }) => {
    I.amOnPage(Pages.Login);
    I.fillField(testerLocators.registration.email, Email.ValidaRegisteredOptionThree);
    I.fillField(testerLocators.registration.password, '1234567');
    I.click(testerLocators.general.submitButton);
    I.seeInCurrentUrl(Pages.ContactList);

    let contactsBefore = await I.grabTextFrom(testerLocators.contactList.contactTable);
    console.log('Contacts before addition:', contactsBefore);

    const numberOfContacts = 3;

    await addMultipleContacts(2);

    let contactsAfter = await I.grabTextFrom(testerLocators.contactList.contactTable);
    console.log('Contacts after addition:', contactsAfter);
    assert.notEqual(contactsBefore, contactsAfter, 'The contact list should have changed after adding new contacts.');
    I.click(testerLocators.contactList.logoutButton);
    I.seeInCurrentUrl(Pages.Login);
});
