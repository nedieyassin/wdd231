const timestampField = document.getElementById('timestamp');
if (timestampField) {
    timestampField.value = new Date().toISOString();
}


const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
const closeButtons = document.querySelectorAll('.modal .close-button');
const modals = document.querySelectorAll('.modal');

learnMoreButtons.forEach(button => {
    button.addEventListener('click', function () {
        const modalId = this.dataset.modal;
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', function () {
        const modal = this.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
        }
    });
});

modals.forEach(modal => {
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
