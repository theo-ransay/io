import { validateEmail } from '../app.js';
import { validateText } from '../app.js';
import { validateNumber } from '../app.js';

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  START NEWSLETTER FORM */

/* ---------------------------------------------------------------------------------------------------------------------- */

// neewsletter form
const newsletterForm = document.getElementById('newsletter-form');

export function sendNewsletterForm(event) {

    event.preventDefault();

    const newsletterForm = event.target;

    // connection at emailjs
    (function() {

        emailjs.init({

            publicKey:"0zjA1b_iFkMP9sBsg",

        });

    })();

    // connect mail service and template mail
    const serviceID = 'service_hr3d5mp';
    const templateID = 'template_p2mrdvg';
    const messageSection = document.querySelector('#newsletter-form #response-message');
    const emailInput = document.querySelector('#newsletter-form #user_email').value;

    // validate mail
    if (!validateEmail(emailInput)) {
        messageSection.innerHTML = '<p class="error-message">Veuillez entrer un email valide.</p>';
        return;
    }

    // send mail
    emailjs.sendForm(serviceID, templateID, this)
        .then(function() {
            messageSection.innerHTML = '<p class="success-message">Inscription réussie !</p>';
        }, function(error) {
            messageSection.innerHTML = '<p class="error-message">Erreur lors de l\'inscription. Veuillez réessayer.</p>';
        });

        newsletterForm.reset();

    setTimeout(function() {
        messageSection.innerHTML = '';
    }, 5000);

}
if (newsletterForm) {

    newsletterForm.addEventListener('submit', sendNewsletterForm);

}

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  END NEWSLETTER FORM */

/* ---------------------------------------------------------------------------------------------------------------------- */