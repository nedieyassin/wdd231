const navToggle = document.querySelector('#nav-toggle');
const navMenu = document.getElementById('#nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('open');
    });
}