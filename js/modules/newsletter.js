/* ---------------------------------------------------------------------------------------------------------------------- */

/*  START NEWSLETTER FORM */

/* ---------------------------------------------------------------------------------------------------------------------- */

// validate email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// neewsletter form
const newsletterForm = document.getElementById('newsletter-form');

function sendNewsletterForm(event) {

    event.preventDefault();

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

}
if (newsletterForm) {

    newsletterForm.addEventListener('submit', sendNewsletterForm);

}

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  END NEWSLETTER FORM */

/* ---------------------------------------------------------------------------------------------------------------------- */