

export const testerLocators = {
    general:{
        submitButton: '[id="submit"]',
    },
    registration: {
        firstName: '[id="firstName"]',
        lastName: '[id="lastName"]',
        error:'[id="error"]',
        email: '[id="email"]',
        password: '[id="password"]',
    },
    contactList:{
        contactList: '[class="main-content"]',
        addAnewContact: '[class="add-contact"]',
        addNewContactButton: '[id="add-contact"]',
        contactTable: '[class="contactTable"]',
        logoutButton: '[id="logout"]',
    },
    addContact:{
        contactInfo: '[id="add-contact"]',
        firstName: '[for=firstName]',
        lastName: '[for=lastName]',
        birthDate: '[for=birthdate]',
        email: '[for=email]',
        phoneNumber: '[for="phone"]',
        street1: '[id=street1]',
        street2: '[id=street2]',
        city: '[id=city]',
        stateProvince: '[id=stateProvince]',
        PostalCode: '[id=postalCode]',
        country: '[id=country]',
    }
}

export const invalidEmails = [
    '@example.com',
    'user@',
    'user@@example.com',
    'userexample.com',
    'user@.com',
    '@userexample.com'
];

export enum Pages{
    Login = 'https://thinking-tester-contact-list.herokuapp.com/',
    Registration  = 'https://thinking-tester-contact-list.herokuapp.com/addUser',
    ContactList = 'https://thinking-tester-contact-list.herokuapp.com/contactList',
}

export enum Email{
    ValidaRegistered = 'newuser@example.com',
    ValidaRegisteredOptionTwo = 'testing12345@test.com',
    ValidaRegisteredOptionThree = 'newuser@similar.com'
}


