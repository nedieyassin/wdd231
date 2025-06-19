const urlParams = new URLSearchParams(window.location.search);

// Get data from URL parameters
const animeTitle = urlParams.get('anime_title') || 'Not provided';
const malId = urlParams.get('anime_id') || 'Not provided';
const userName = urlParams.get('user_name') || 'Anonymous';
const reviewText = urlParams.get('review_text') || 'No review content provided.';


document.getElementById('display-animeTitle').textContent = animeTitle;
document.getElementById('display-malId').textContent = malId;
document.getElementById('display-userName').textContent = userName;
document.getElementById('display-reviewText').textContent = reviewText;