const recommendationGrid = document.getElementById('recommendation-grid');
const recommendationForm = document.getElementById('recommendation-form');
const formMessage = document.getElementById('form-message');

const RECOMMENDATIONS_URL = 'https://api.jikan.moe/v4/recommendations/anime';

async function loadRecommendations() {
    recommendationGrid.innerHTML = '<p>Loading latest recommendations...</p>';
    try {
        const response = await fetch(RECOMMENDATIONS_URL);

        if (!response.ok) {
            if (response.status === 429) {
                const retryAfter = response.headers.get('Retry-After');
                console.warn(`Jikan API Rate Limit Exceeded. Retrying after ${retryAfter || 5} seconds.`);
                recommendationGrid.innerHTML = `<p>Too many requests to Jikan API. Please try again in a moment. </p>`;
                return;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const recommendations = data.data;

        displayRecommendations(recommendations);

    } catch (error) {
        console.error('Error loading recommendations from Jikan API:', error);
        recommendationGrid.innerHTML = '<p>Failed to load recommendations. Please try again later.</p>';
    }
}

function displayRecommendations(recommendations) {
    recommendationGrid.innerHTML = '';

    if (recommendations && recommendations.length > 0) {
        recommendations.slice(0, 30).forEach(rec => {
            const title = rec.entry[0]?.title || 'Unknown Title';
            const malId = rec.entry[0]?.mal_id;
            const recommenderUsername = rec.user?.username || 'Anonymous';
            const reviewContent = rec.content || 'No review content provided.';

            const recCard = `
                    <div class="recommendation-card card">
                        <h3>${title}</h3>
                        <p class="recommender">Recommended by <span>${recommenderUsername}</span></p>
                        <p class="review">"${reviewContent}"</p>
                        ${malId ? `<a href="anime-detail.html?mal_id=${malId}" class="details-button">View Anime</a>` : ''}
                    </div>
                `;
            recommendationGrid.insertAdjacentHTML('beforeend', recCard);
        });
    } else {
        recommendationGrid.innerHTML = '<p>No recommendations found.</p>';
    }
}

recommendationForm.addEventListener('submit', (event) => {

    formMessage.style.display = 'none';

    const formData = new FormData(recommendationForm);
    const animeTitle = formData.get('anime_title').trim();
    const userName = formData.get('user_name').trim();
    const reviewText = formData.get('review_text').trim();

    if (!animeTitle || !userName || !reviewText) {
        displayFormMessage('error', 'Please fill in all required fields (Anime Title, Your Name, Review).');
        event.preventDefault();
        console.error('Error loading recommendations from Jikan API:', error);
    }

});


function displayFormMessage(type, message) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

loadRecommendations();
