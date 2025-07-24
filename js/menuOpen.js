document.querySelector('.menu-toggle').addEventListener('click', function () {
  this.classList.toggle('is-active');
  document.querySelector('.menu').classList.toggle('is-open');
  this.setAttribute('aria-expanded', this.classList.contains('is-active'));
});


document.querySelectorAll('.menu__item--has-children > .menu__link').forEach(button => {
  button.addEventListener('click', (e) => {

    if (window.innerWidth >= 1200) return;

    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !expanded);
    button.nextElementSibling.classList.toggle('is-open');
    e.preventDefault();
  });
});