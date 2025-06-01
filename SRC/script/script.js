let menu = document.querySelector('#menu-icon-js');
let menuicon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let navtc = document.querySelector('#nav-tc-js');

menu.onclick = () => {
	menuicon.classList.toggle('bx-x');
	navbar.classList.toggle('open');
	navtc.classList.toggle("nav-touch-close-open");
}

navtc.onclick = () => {
	menuicon.classList.toggle('bx-x');
	navbar.classList.remove('open');
	navtc.classList.remove('nav-touch-close-open');
	navtc.classList.remove("nav-tc-z");
	navtc.classList.remove("nav-LR-TC");
}

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
	var currentScrollPos = window.pageYOffset;

	document.getElementById("header").classList.add('scrolled');
	if (currentScrollPos === 0) {
		// console.log("Hello");
		document.getElementById("header").classList.remove('scrolled');
	}
	if (navtc.classList.contains('nav-touch-close-open')) {
		return;
	}
	if (prevScrollpos > currentScrollPos) {
		document.getElementById("header").style.top = "0";
	} else {
		document.getElementById("header").style.top = "-100px";
	}
	prevScrollpos = currentScrollPos;
}


const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const errorDiv = document.querySelector('.error');
  const emailErrorDiv = document.querySelector('.email-error');
  const contactButton = document.querySelector('.contact-button');
  const contactLoad = document.querySelector('.contact-load');
  const submitText = document.querySelector('.submit-text');
  const contactSubmitAfter = document.querySelector('.contact-submit-after');
  const formSection = document.querySelector('.form-section');
  const contactSection = document.querySelector('.contact-section');
  const csaOK = document.querySelector('.csa-ok');

  if (csaOK) {
    csaOK.onclick = () => {
      contactSubmitAfter.classList.remove('show');
      formSection.classList.remove('hide');
      contactSection.classList.remove('csa-cs');
      contactForm.classList.remove('csa-cf');
      contactButton.classList.remove('loading');
      contactLoad.classList.remove('show');
      submitText.classList.remove('hide');
    };
  }

  function validateForm(event) {
    event.preventDefault();
    let isValid = true;
    let emailIsValid = true;
    let nameIsValid = true;
    let messageIsValid = true;

    if (nameInput.value.trim() === '') {
      isValid = false;
      nameIsValid = false;
    }

    if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
      isValid = false;
      if (emailInput.value.trim() !== '' && !isValidEmail(emailInput.value)) {
        emailIsValid = false;
      }
    }

    if (messageInput.value.trim() === '') {
      isValid = false;
      messageIsValid = false;
    }

    if (!isValid) {
      errorDiv.classList.add('error-show');
      emailErrorDiv.classList.remove('error-show');
      if (nameIsValid && messageIsValid && !emailIsValid) {
        errorDiv.classList.remove('error-show');
        emailErrorDiv.classList.add('error-show');
      }
    } else {
      emailErrorDiv.classList.remove('error-show');
      errorDiv.classList.remove('error-show');
      contactButton.classList.add('loading');
      contactLoad.classList.add('show');
      submitText.classList.add('hide');

      setTimeout(() => {
        sendMail();
      }, 2000);
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  contactForm.addEventListener('submit', validateForm);

  function sendMail() {
    const params = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value
    };

    const serviceID = "service_j50gb3s"; // Put your EmailJS service ID
    const templateID = "template_qkybkkx"; // Put your EmailJS template ID

    emailjs.send(serviceID, templateID, params)
      .then(() => {
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";

        contactSubmitAfter.classList.add('show');
        formSection.classList.add('hide');
        contactSection.classList.add('csa-cs');
        contactForm.classList.add('csa-cf');

        contactButton.classList.remove('loading');
        contactLoad.classList.remove('show');
        submitText.classList.remove('hide');
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        alert('Oops! Something went wrong. Please try again later.');
        contactButton.classList.remove('loading');
        contactLoad.classList.remove('show');
        submitText.classList.remove('hide');
      });
  }


