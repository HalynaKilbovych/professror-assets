
document.addEventListener('DOMContentLoaded', function () {
  // === ROT-логіка ===
  const rotRadios = document.querySelectorAll('input[name="rot"]');
  const rotDetails = document.querySelector('.rot-details');
  const villaFields = document.querySelector('.rot-details__fields--villa');
  const bostadsrattFields = document.querySelector('.rot-details__fields--bostadsratt');
  const propertyButtons = document.querySelectorAll('.rot-details__button');

  rotRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'ja' && radio.checked) {
        rotDetails.classList.remove('is-hidden');
      } else if (radio.value === 'nej' && radio.checked) {
        rotDetails.classList.add('is-hidden');
        villaFields.classList.add('is-hidden');
        bostadsrattFields.classList.add('is-hidden');
        propertyButtons.forEach(btn => btn.classList.remove('is-active'));
      }
    });
  });

  propertyButtons.forEach(button => {
    button.addEventListener('click', () => {
      propertyButtons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      const type = button.getAttribute('data-type');
      if (type === 'villa') {
        villaFields.classList.remove('is-hidden');
        bostadsrattFields.classList.add('is-hidden');
      } else if (type === 'bostadsratt') {
        bostadsrattFields.classList.remove('is-hidden');
        villaFields.classList.add('is-hidden');
      }
    });
  });

  // === intl-tel-input ініціалізація ===
  const phoneInput = document.querySelector('#phone');
  const iti = window.intlTelInput(phoneInput, {
    initialCountry: 'se',
    preferredCountries: ['se', 'no', 'fi'],
    separateDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.3.0/js/utils.js"
  });

  const addressInput = document.getElementById('address');
const autocomplete = new google.maps.places.Autocomplete(addressInput, {
  types: ['geocode'],
  componentRestrictions: { country: 'se' }
});

  // === Функції для показу помилок ===
  function showError(input, message) {
    input.classList.add('has-error');

    let errorEl = input.parentNode.querySelector('.form__error-message');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.classList.add('form__error-message');
      input.parentNode.appendChild(errorEl);
    }
    errorEl.textContent = message;
  }

  function clearError(input) {
    input.classList.remove('has-error');
    const errorEl = input.parentNode.querySelector('.form__error-message');
    if (errorEl) errorEl.remove();
  }

  // === Валідація форми ===
  const form = document.getElementById('orderForm');
  form.addEventListener('submit', function (e) {
    let isValid = true;

    const emailInput = form.querySelector('#email');

    // Перевірка Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      isValid = false;
      showError(emailInput, 'Ange en giltig e-postadress.');
    } else {
      clearError(emailInput);
    }

    // Перевірка телефону через intl-tel-input
    if (!iti.isValidNumber()) {
      isValid = false;
      showError(phoneInput, 'Ange ett giltigt telefonnummer.');
    } else {
      clearError(phoneInput);
      // Зберігаємо в повному міжнародному форматі перед сабмітом
      phoneInput.value = iti.getNumber();
    }

    if (!isValid) {
      e.preventDefault();
    }
  });
});
