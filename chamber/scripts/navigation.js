const navButton = document.querySelector('#nav-button');
const navContainer = document.querySelector('#nav-container');

const openIcon = document.querySelector('#nav-button-open-icon');
const closeIcon = document.querySelector('#nav-button-close-icon');


navButton.addEventListener('click', () => {
    navContainer.classList.toggle('nav-container-open');
    if (navContainer.classList.contains("nav-container-open")) {
        openIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        closeIcon.style.display = 'none';
        openIcon.style.display = 'block';
    }
})