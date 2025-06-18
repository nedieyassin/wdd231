const lastVisitMessage = document.getElementById('lastVisitMessage');
const MS_IN_DAY = 1000 * 60 * 60 * 24;

const lastVisit = localStorage.getItem('lastVisit');
const currentVisit = Date.now();

if (!lastVisit) {
    // First visit
    lastVisitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const lastVisitDate = parseInt(lastVisit, 10);
    const daysSinceLastVisit = Math.round((currentVisit - lastVisitDate) / MS_IN_DAY);

    if (daysSinceLastVisit < 1) {
        lastVisitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysSinceLastVisit === 1) {
        lastVisitMessage.textContent = "You last visited 1 day ago.";
    } else {
        lastVisitMessage.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
    }
}

localStorage.setItem('lastVisit', currentVisit.toString());


const galleryContainer = document.querySelector('.main-content-gallery');

async function loadGallery() {
    try {
        const response = await fetch('data/places.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const places = await response.json();

        places.forEach(place => {
            const card = document.createElement('div');
            card.classList.add('interest-card');

            card.innerHTML = `
                <h2>${place.name}</h2>
                <figure>
                    <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
                </figure>
                <address>${place.address}</address>
                <p>${place.description}</p>
                <button class="learn-more-btn">Learn More</button>
            `;
            galleryContainer.appendChild(card);
        });

    } catch (error) {
        galleryContainer.innerHTML = '<p>Failed to load discovery items. Please try again later.</p>';
    }
}
loadGallery()