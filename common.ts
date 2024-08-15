import {Pages, testerLocators} from "./poms";

const { I } = inject();

export const uniqueEmail = generateUniqueEmail(); // Generate a unique email

export function generateUniqueEmail(): number {
    const randomNum = Math.floor(Math.random() * 1000); // generates a random number
    return randomNum;
}

export const uniqueIdentifier = generateUniqueEmail();
export const newEmail = `johndoe_${uniqueIdentifier}@example.com`;

export async function addMultipleContacts(numberOfContacts: number) {
    for (let i = 0; i < numberOfContacts; i++) {

        I.click(testerLocators.contactList.addNewContactButton);
        I.fillField(testerLocators.addContact.firstName, `John-${uniqueIdentifier}`);
        I.fillField(testerLocators.addContact.lastName, `Doe-${uniqueIdentifier}`);
        I.fillField(testerLocators.addContact.birthDate, '1980-01-01');
        I.fillField(testerLocators.addContact.email, newEmail);
        I.fillField(testerLocators.addContact.phoneNumber, '8005555555');
        I.click(testerLocators.general.submitButton);

        I.waitForElement(testerLocators.contactList.contactTable, 10);
        I.amOnPage(Pages.ContactList);
        I.waitForElement(testerLocators.contactList.contactTable, 10);
        I.see(newEmail, testerLocators.contactList.contactTable);
    }};

export function fillAndSubmit(email, password) {
    I.fillField(testerLocators.registration.email, email);
    I.fillField(testerLocators.registration.password, password);
    I.click(testerLocators.general.submitButton);
}
