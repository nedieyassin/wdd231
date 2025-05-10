const navButton = document.querySelector('#nav-button');
const navContainer = document.querySelector('#nav-container');

const openIcon = document.querySelector('#nav-button-open-icon');
const closeIcon = document.querySelector('#nav-button-close-icon');


navButton.addEventListener('click', () => {
    navContainer.classList.toggle('open');
    if (navContainer.classList.contains("open")) {
        openIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        closeIcon.style.display = 'none';
        openIcon.style.display = 'block';
    }
})