/* ---------------------------------------------------------------------------------------------------------------------- */

/*  START CONTACT FORM */

/* ---------------------------------------------------------------------------------------------------------------------- */

function choiceContactForm() {

    /* choice form button */
    const contactFormButton = document.getElementById('contact-button');
    const pricingFormButton = document.getElementById('pricing-button');

    /* forms */
    const contactFrom = document.getElementById('contactForm');
    const pricingFrom = document.getElementById('pricingForm');

    if (contactFrom || pricingFrom) {

        contactFormButton.addEventListener('click', function (event) {

            event.preventDefault();

            /* apear form */
            pricingFrom.classList.remove('open');
            contactFrom.classList.add('open');

            /* handle display choice form button */
            pricingFormButton.classList.remove('open');
            contactFormButton.classList.add('open');

        });

        pricingFormButton.addEventListener('click', function (event) {

            event.preventDefault();

            /* apear form */
            pricingFrom.classList.add('open');
            contactFrom.classList.remove('open');

            /* handle display choice form button */
            pricingFormButton.classList.add('open');
            contactFormButton.classList.remove('open');

        });

    }

}
document.addEventListener('DOMContentLoaded', choiceContactForm);

// email validation
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// text validation
function validateText(input) {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    return regex.test(input);
}

// number validation
function validateNumber(input) {
    const regex = /^\d+([.,]\d+)?$/;
    return regex.test(input);
}

// contact form
const contactForm = document.getElementById('contactForm');

function sendContactForm(event) {

    event.preventDefault();

    // connection at emailjs
    (function() {

        emailjs.init({

            publicKey:"0zjA1b_iFkMP9sBsg",

        });

    })();

    // connect mail service and template mail
    const serviceID = 'service_hr3d5mp';
    const templateID = 'template_dhqnqed';
    const messageSection = document.querySelector('#contactForm #response-message');
    const nameInput = document.querySelector('#contactForm #user_name').value;
    const emailInput = document.querySelector('#contactForm #user_mail').value;
    const messageInput = document.querySelector('#contactForm #message').value;

    // validate name
    if (!validateText(nameInput)) {
        messageSection.innerHTML = '<p class="error-message">Veuillez entrer un nom et prénom valide.</p>';
        return;
    }

    // validate mail
    if (!validateEmail(emailInput)) {
        messageSection.innerHTML = '<p class="error-message">Veuillez entrer un email valide.</p>';
        return;
    }

    // validate massage
    if (!validateText(messageInput)) {
        messageSection.innerHTML = '<p class="error-message">Veuillez entrer un message valide.</p>';
        return;
    }

    // send mail
    emailjs.sendForm(serviceID, templateID, this)
        .then(function() {
            messageSection.innerHTML = '<p class="success-message">Je vous souhaite du soleil durant les 24 prochaines heures avant ma réponse.</p>';
        }, function(error) {
            messageSection.innerHTML = '<p class="error-message">Votre message ne m\'a pas été transmis. Je vous invite à réessayer.</p>';
        });

        contactForm.reset();

}
if (contactForm) {

    contactForm.addEventListener('submit', sendContactForm);

}

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  END CONTACT FORM */

/* ---------------------------------------------------------------------------------------------------------------------- */


/* ---------------------------------------------------------------------------------------------------------------------- */

/*  START PRICING FORM */

/* ---------------------------------------------------------------------------------------------------------------------- */

// pricing form
const pricingForm = document.getElementById('pricingForm');

function sendPricingForm(event) {

    event.preventDefault();

    // connection at emailjs
    (function() {

        emailjs.init({

            publicKey:"0zjA1b_iFkMP9sBsg",

        });

    })();

    // connect mail service and template mail
    const serviceID = 'service_hr3d5mp';
    const templateID = 'template_dhqnqed';
    const messageSection = document.querySelector('#pricingForm #response-message');
    const nameInput = document.querySelector('#pricingForm #user_name').value;
    const phoneNumberInput = document.querySelector('#pricingForm #user_phone_number').value;
    const siretNumberInput = document.querySelector('#pricingForm #user_siret_number').value;
    const emailInput = document.querySelector('#pricingForm #user_mail').value;
    const messageInput = document.querySelector('#pricingForm #message').value;

    // validate name
    if (!validateText(nameInput)) {
        messageSection.innerHTML = '<p class="error-message">Veuillez entrer un nom et prénom valide.</p>';
        return;
    }

    // validate phone number
    if (!validateNumber(phoneNumberInput)) {
        messageSection.innerHTML = '<p class="error-message">Veuillez entrer un numéro de téléphone valide.</p>';
        return;
    }

    // validate siret number
    if (!validateNumber(siretNumberInput)) {
        messageSection.innerHTML = '<p class="error-message">Veuillez entrer un siret valide.</p>';
        return;
    }

    // validate mail
    if (!validateEmail(emailInput)) {
        messageSection.innerHTML = '<p class="error-message">Veuillez entrer un email valide.</p>';
        return;
    }

    // validate message
    if (!validateText(messageInput)) {
        messageSection.innerHTML = '<p class="error-message">Veuillez entrer un message valide.</p>';
        return;
    }

    // send mail
    emailjs.sendForm(serviceID, templateID, this)
        .then(function() {
            messageSection.innerHTML = '<p class="success-message">Je vous souhaite du soleil durant les 24 prochaines heures avant ma réponse.</p>';
        }, function(error) {
            messageSection.innerHTML = '<p class="error-message">Votre demande de devis ne m\'a pas été transmis. Je vous invite à réessayer.</p>';
        });

        pricingForm.reset();

}
if (pricingForm) {

    pricingForm.addEventListener('submit', sendPricingForm);

}

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  END PRICING FORM */

/* ---------------------------------------------------------------------------------------------------------------------- */