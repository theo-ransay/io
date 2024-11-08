/* ---------------------------------------------------------------------------------------------------------------------- */

/*  START CONFIG BARBA.JS */

/* ---------------------------------------------------------------------------------------------------------------------- */

const cursorCustom = document.getElementById('cursor-custom');
const loader = document.getElementById('loader');
const main = document.querySelector('main');

const TlAnim = new TimelineMax();

/* ---------------------------------------------------------------------------------------------------------------------- */

/* function for delay between leave and enter page */
function delay(time) {

    return new Promise((done) => {

        setTimeout(() => {

            done();

        }, time);

    });

}

/* ---------------------------------------------------------------------------------------------------------------------- */

// hendle hash url for barba.js
function forcePushHashUrl() {

    document.querySelectorAll('a').forEach(anchor => {

        anchor.addEventListener('click', function(event) {

            const href = this.getAttribute('href');
            const destination = href.split('#')[0];

            if (href.includes('#') && destination !== window.location.href.split('#')[0]) {

                event.preventDefault();

                const sectionDestination = href.split('#')[1];

                barba.go(destination).then(() => {

                    const targetElement = document.getElementById(sectionDestination);

                    if (targetElement) {
                        setTimeout(() => {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                        }, 3600);
                    }

                });
            }

        });

    });

}
document.addEventListener('DOMContentLoaded', forcePushHashUrl);

/* ---------------------------------------------------------------------------------------------------------------------- */

// css file map
const urlToCssMap = {

    '/index': 'home.css',
    '/accueil': 'home.css',
    '/contact': 'contact.css',
    '/wipuulce': 'wipuulce.css',
    '/mentions': 'privacy-policies.css',

};
// reload stylesheet whene enter
function loadCSSBasedOnPage(urlMap) {
    const currentUrl = window.location.href;

    for (const [urlSubstring, cssFile] of Object.entries(urlMap)) {

        if (currentUrl.includes(urlSubstring)) {

            const link = document.createElement('link');

            link.rel = 'stylesheet';
            link.href = `css/pages/${cssFile}?` + new Date().getTime();
            link.setAttribute('data-dynamic-css', 'true');

            document.head.appendChild(link);
            break;
        }

    }

}
// delete stylesheet whene leave
function removeDynamicCSS() {

    const dynamicCSSLinks = document.querySelectorAll('link[data-dynamic-css="true"]');

    dynamicCSSLinks.forEach(link => {

        link.parentNode.removeChild(link);

    });

}

/* ---------------------------------------------------------------------------------------------------------------------- */

// handle display page with barba.js
barba.init({

    sync: true,
    transitions: [
        {
            async leave() {

                const done = this.async();
                const zoomCursorValue = window.innerWidth * 3;

                setTimeout(() => {

                    removeDynamicCSS();

                }, 1400);

                TlAnim.to(cursorCustom, { scale: `${zoomCursorValue}`, ease: 'power2.in', duration: 1.4, onComplete: () => {

                    deleteIndicator();

                    main.classList.remove('apear');

                }});

                await delay(1400);
                done();

            },
            enter() {

                TlAnim.to(cursorCustom, { scale: 1, ease: 'power2.out', duration: 1.4, onComplete: () => {

                    main.classList.add('apear');

                    initHeader();
                    addIndicator();
                    initNavMobileCallback();
                    forcePushHashUrl();
                    initCarousel();
                    initCollapseHeads();

                }});

            },
            afterEnter() {

                loadCSSBasedOnPage(urlToCssMap);
                initNavMobileCallback();
                observeElements('#main-section > section.animate-element, #main-section > footer.animate-element', '#main-section');

            }
        }
    ]

});

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  END CONFIG BARBA.JS */

/* ---------------------------------------------------------------------------------------------------------------------- */


/* ---------------------------------------------------------------------------------------------------------------------- */

/*  START CUSTOM CURSOR */

/* ---------------------------------------------------------------------------------------------------------------------- */

const coords = { x: -16, y: -16 };
const cursorTearsEffect = document.querySelectorAll('.cursor-custom-tear-effect');

cursorTearsEffect.forEach(function (tear) {
    tear.x = 0;
    tear.y = 0;
});

window.addEventListener('mousemove', function(e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animationTear() {

    let x = coords.x;
    let y = coords.y;

    cursorTearsEffect.forEach(function (tear, index) {

        tear.style.left = x - 8 + "px";
        tear.style.top = y - 8 + "px";

        tear.style.transform = `scale(${(cursorTearsEffect.length - index) / cursorTearsEffect.length})`;

        tear.x = x;
        tear.y = y;

        const nextTear = cursorTearsEffect[index + 1] || cursorTearsEffect[0];

        x += (nextTear.x - x) * 0.15;
        y += (nextTear.y - y) * 0.15;

    });

    requestAnimationFrame(animationTear);

}
document.addEventListener('DOMContentLoaded', animationTear);

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  START LOADER */

/* ---------------------------------------------------------------------------------------------------------------------- */

// loader
document.addEventListener('DOMContentLoaded', function () {

    setTimeout(() => {

        main.classList.add('apear');

    }, 3900);

});

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  END LOADER */

/* ---------------------------------------------------------------------------------------------------------------------- */


/* ---------------------------------------------------------------------------------------------------------------------- */

/*  START HEADER AND FLOAT SECTION */

/* ---------------------------------------------------------------------------------------------------------------------- */

// Header, cookie banner and main apear
function initHeader() {

    const header = document.querySelector('header');
    const cookieBannerAndCitation = document.querySelector('.bottom-float-container');
    const realMainContainer = document.getElementById('main-section');

    // handle scroll
    let lastScrollTop = 0;

    realMainContainer.addEventListener('scroll', function() {

        let scrollTop = realMainContainer.scrollTop;

        if (scrollTop === 0) {

            // Remove header-apear class at the top of the page
            header.classList.remove('header-apear');
            cookieBannerAndCitation.classList.remove('bottom-banner-apear');

        } else if (scrollTop > lastScrollTop + 50) {

            // Scrolling down
            header.classList.remove('header-apear');
            cookieBannerAndCitation.classList.remove('bottom-banner-apear');

            header.classList.add('header-desapear-on-scroll');
            cookieBannerAndCitation.classList.add('bottom-banner-desapear-on-scroll');

            lastScrollTop = scrollTop;

        } else if (scrollTop < lastScrollTop - 50) {

            // Scrolling up
            header.classList.remove('header-desapear-on-scroll');
            cookieBannerAndCitation.classList.remove('bottom-banner-desapear-on-scroll');

            header.classList.add('header-apear');
            cookieBannerAndCitation.classList.remove('bottom-banner-apear');

            lastScrollTop = scrollTop;

        }

    });

}
document.addEventListener('DOMContentLoaded', initHeader);

// header nav indicator (delete active class)
function deleteIndicator() {

    const navMenu = document.querySelectorAll('header nav a, nav#header-nav-mobile-menu a');

    // handle page indicator
    navMenu.forEach(link => {

        link.classList.remove('active');

    });

}

// header nav indicator (add active class)
function addIndicator() {

    const navMenu = document.querySelectorAll('header nav a, nav#header-nav-mobile-menu a');
    const homeMenuItem = document.querySelector('header nav a[href="accueil"]');
    const homeMobileMenuItem = document.querySelector('nav#header-nav-mobile-menu a[href="accueil"]');

    // handle page indicator
    navMenu.forEach(link => {

        let linkUri = link.href;

        if (linkUri === window.location.href) {

            link.classList.add('active');

        } else if (window.location.pathname === "/io/") {

            homeMenuItem.classList.add('active');
            homeMobileMenuItem.classList.add('active');

        }

    });

}
document.addEventListener('DOMContentLoaded', addIndicator);

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  END HEADER AND FLOAT SECTION */

/* ---------------------------------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  START MOBILE NAV MENU */

/* ---------------------------------------------------------------------------------------------------------------------- */

function initNavMobileCallback() {

    const openNavMobileCallbackButton = document.querySelector('#header-mobile-callback-button a');
    const navMobileMenu = document.getElementById('header-nav-mobile-menu');
    const navMobileItems = document.querySelectorAll('#header-nav-mobile-menu ul li a');

    openNavMobileCallbackButton.addEventListener('click', function (event) {

        event.preventDefault();

        if (openNavMobileCallbackButton.classList.contains('open') === true) {

            openNavMobileCallbackButton.classList.remove('open');
            navMobileMenu.classList.remove('open');

        } else {
            openNavMobileCallbackButton.classList.add('open');
            navMobileMenu.classList.add('open');
        }

    });

    navMobileItems.forEach(function(item) {

        item.addEventListener('click', function() {

            // delai for animation whene leave page
            setTimeout(() => {
                openNavMobileCallbackButton.classList.remove('open');
                navMobileMenu.classList.remove('open');
            }, 900);

        });

    });

}
document.addEventListener('DOMContentLoaded', initNavMobileCallback);

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  END MOBILE NAV MENU */

/* ---------------------------------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  START DARKMODE */

/* ---------------------------------------------------------------------------------------------------------------------- */

// darkmode
const lightButton = document.getElementById('sun-button');
const darkButton = document.getElementById('moon-button');
let body = document.querySelector('body');

// light button
lightButton.addEventListener('click', function () {
    body.classList.remove('dark');
    body.classList.add('light');

    localStorage.setItem('darkMode', 'disabled');
});

// dark button
darkButton.addEventListener('click', function () {
    body.classList.remove('light');
    body.classList.add('dark');

    localStorage.setItem('darkMode', 'enabled');
});

// save value for navigate with prefer color scheme
if (localStorage.getItem('darkMode') === 'enabled' && body.classList.contains('light')) {

    body.classList.remove('light');
    body.classList.add('dark');

} else if (localStorage.getItem('darkMode') === 'disabled' && body.classList.contains('dark')) {

    body.classList.remove('dark');
    body.classList.add('light');

}

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  END DARKMODE */

/* ---------------------------------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  START ANIMATIONS */

/* ---------------------------------------------------------------------------------------------------------------------- */

function observeElements(selector, scrollContainer, options = { root: null, rootMargin: '0px', threshold: 0.5 }) {

    // Fonction pour vérifier si l'élément est visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);

    // Cible tous les éléments à observer
    const targetElements = document.querySelectorAll(selector);
    const scrollDiv = document.querySelector(scrollContainer);

    // Observer les éléments après le chargement de la page
    targetElements.forEach(targetElement => {
        observer.observe(targetElement);
    });

    // Observer les éléments également lors du scroll dans le conteneur spécifié
    scrollDiv.addEventListener('scroll', function () {
        targetElements.forEach(targetElement => {
            observer.observe(targetElement);
        });
    });
}
window.addEventListener('load', function () {
    // Determine if the device is mobile
    const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;

    // Set threshold based on device type
    const threshold = isMobile ? 0.2 : 0.5; // Modify the threshold value for mobile

    // Pass the modified options to the observeElements function
    observeElements('#main-section > section.animate-element, #main-section > footer.animate-element', '#main-section', {
        root: null,
        rootMargin: '0px',
        threshold: threshold
    });
});

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  END ANIMATIONS */

/* ---------------------------------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  START CAROUSEL */

/* ---------------------------------------------------------------------------------------------------------------------- */

// slides
const splides = [];

function initCarousel() {

    // Détruire toutes les instances existantes
    splides.forEach(instance => instance.destroy());
    splides.length = 0;

    // Initialisation du carrousel pour la section portfolio
    let splidePortfolio = document.querySelector('.portfolio-container.splide');

    if (splidePortfolio) {
        let splide = new Splide('.portfolio-container.splide', {
            autoWidth: false,
            perPage: 1,
            perMove: 1,
            gap: '24px',
            speed: 0,
            pagination: false,
            snap: true,
        });
        splide.mount();
        splides.push(splide);

    }

    // Initialisation du carrousel pour la section reviews
    let splideReviews = document.querySelector('.reviews-container.splide');
    if (splideReviews) {
        let splideReviewsInstance = new Splide('.reviews-container.splide', {
            perPage: 3,
            gap: '24px',
            pagination: false,
            snap: true,
            breakpoints: {
                1285: {
                    perPage: 2
                },
                768: {
                    perPage: 1
                }
            }
        });
        splideReviewsInstance.mount();
        splides.push(splideReviewsInstance);
    }
}
// slide portfolio
document.addEventListener( 'DOMContentLoaded', function() {

    let splidePortfolio = document.querySelector('.portfolio-container.splide');

    if (splidePortfolio) {

        var splide = new Splide( '.portfolio-container.splide', {
            type: 'fade',
            autoWidth: false,
            perPage: 1,
            perMove: 1,
            gap: '24px',
            speed: 0,
            pagination: false,
            snap: true,
        });

        splide.mount();

    }

});
// slide review
document.addEventListener( 'DOMContentLoaded', function() {
    let element = document.querySelector('.reviews-container.splide');
    if (element) {
        var splide = new Splide( '.reviews-container.splide', {
            perPage: 3,
            perMove: 1,
            gap: '24px',
            pagination: false,
            snap: true,
            breakpoints: {
                1285: {
                    perPage: 2
                },
                768: {
                    perPage: 1
                }
            }
        });
        splide.mount();
    }
});

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  END CAROUSEL */

/* ---------------------------------------------------------------------------------------------------------------------- */


/* ---------------------------------------------------------------------------------------------------------------------- */

/*  START FAQ */

/* ---------------------------------------------------------------------------------------------------------------------- */

// FAQ
function initCollapseHeads() {

    const collapseHeads = document.querySelectorAll('.collapse-head');

    collapseHeads.forEach(function(collapseHead) {

        collapseHead.addEventListener('click', function() {

            // Ferme tous les containers avant d'ouvrir le sélectionné
            document.querySelectorAll('.faq-items-container').forEach(function(collapseContainer) {
                collapseContainer.classList.remove('lightness-element');
                collapseContainer.classList.remove('open');
            });

            // Trouve le conteneur associé au collapseHead cliqué
            const collapseContainer = collapseHead.parentElement.parentElement;
            collapseContainer.classList.toggle('lightness-element');
            collapseContainer.classList.toggle('open');

        });

    });

}
document.addEventListener('DOMContentLoaded', initCollapseHeads);

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  END FAQ */

/* ---------------------------------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  START COOKIE BANNER */

/* ---------------------------------------------------------------------------------------------------------------------- */

/* openner cookie banner */
const opennerConsentBanner = document.getElementById('openner-consent-banner');
const cookieBanner = document.getElementById('cookie-banner-container');

opennerConsentBanner.addEventListener('click', function() {

    opennerConsentBanner.classList.add('close');
    cookieBanner.classList.add('open');

});

/* openner cookie custom consent modal */
const closerCookieModal = document.getElementById('custom-cookies-close-modal');
const cookieConsentModal = document.getElementById('custom-cookies-consent-modal');

closerCookieModal.addEventListener('click', function() {

    cookieConsentModal.classList.remove('open');

});

document.addEventListener("DOMContentLoaded", function () {

    const acceptAllButton = document.getElementById('all-consent');
    const deniAllButton = document.getElementById('all-no-consent');
    const customButton = document.getElementById('custom-consent');
    const formCustomCookies = document.getElementById('custom-cookies-consent');
    let consent = "";

    function cookiesFonctionnal() {
        // Do nothing
    }

    function cookiesNecessary() {
        // Do nothing
    }

    function cookiesAnalytics() {

        // Google analytics
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-PJTFG33G88');

    }

    function executeScripts(consent) {

        if (consent === "all") {

            cookiesFonctionnal();
            cookiesAnalytics();

        } else if (consent === "not-all") {

            cookiesNecessary();

        }

        if (consent === "fonctionnal") {

            cookiesFonctionnal();

        }

        if (consent === "analitycs") {

            cookiesAnalytics();

        }

    }

    if (localStorage.getItem('cookiesConsents') === 'all') {

        cookieBanner.classList.remove('open');
        opennerConsentBanner.classList.remove('close');
        consent = 'all';

        executeScripts(consent);

    } else if (localStorage.getItem('cookiesConsents') === 'fonctionnal') {

        cookieBanner.classList.remove('open');
        opennerConsentBanner.classList.remove('close');
        consent = 'fonctionnal';

        executeScripts(consent);

    } else if (localStorage.getItem('cookiesConsents') === 'analitycs') {

        cookieBanner.classList.remove('open');
        opennerConsentBanner.classList.remove('close');
        consent = 'analitycs';

        executeScripts(consent);

    } else if (localStorage.getItem('cookiesConsents') === 'not-all') {

        cookieBanner.classList.remove('open');
        opennerConsentBanner.classList.remove('close');
        consent = 'not-all';

        executeScripts(consent);

    }

    acceptAllButton.addEventListener('click', function(e) {

        e.preventDefault();

        localStorage.setItem('cookiesConsents', 'all');
        cookieBanner.classList.remove('open');
        opennerConsentBanner.classList.remove('close');
        consent = 'all';

        executeScripts(consent);

    });

    deniAllButton.addEventListener('click', function(e) {

        e.preventDefault();

        localStorage.setItem('cookiesConsents', 'not-all');
        cookieBanner.classList.remove('open');
        opennerConsentBanner.classList.remove('close');
        consent = 'not-all';

        executeScripts(consent);

    });

    customButton.addEventListener('click', function(e) {

        e.preventDefault();

        cookieBanner.classList.remove('open');
        opennerConsentBanner.classList.remove('close');
        cookieConsentModal.classList.add('open');

    });

    formCustomCookies.addEventListener('submit', function(event) {

        event.preventDefault();

        const cookieBase = document.querySelector('input[value="cookie-base"]').checked;
        const cookieAnalytics = document.querySelector('input[value="cookie-analitycs"]').checked;

        if (cookieBase && !cookieAnalytics) {

            localStorage.setItem('cookiesConsents', 'fonctionnal');
            consent = "fonctionnal";
            executeScripts(consent);

        } else if (cookieAnalytics && !cookieBase) {

            localStorage.setItem('cookiesConsents', 'analitycs');
            consent = "analitycs";
            executeScripts(consent);

        } else if (cookieBase && cookieAnalytics) {

            localStorage.setItem('cookiesConsents', 'all');
            consent = "all";
            executeScripts(consent);

        }

        cookieConsentModal.classList.remove('open');

    });

});

/* ---------------------------------------------------------------------------------------------------------------------- */

/*  END COOKIE BANNER */

/* ---------------------------------------------------------------------------------------------------------------------- */