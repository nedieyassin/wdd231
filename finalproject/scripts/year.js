// Current year for footer
const currentYearSpan = document.querySelector('#currentYear');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Last modified date for footer
const lastModifiedSpan = document.querySelector('#lastModified');
if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
}