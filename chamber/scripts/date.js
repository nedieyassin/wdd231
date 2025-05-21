const currentYear = document.querySelector('#currentYear');
currentYear.textContent = (new Date().getFullYear()).toString();


const lastModified = document.querySelector('#lastModified');

lastModified.textContent = document.lastModified;