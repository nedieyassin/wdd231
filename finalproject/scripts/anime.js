const animeListGrid = document.querySelector('#anime-list-grid');
const searchInput = document.querySelector('#anime-search-input');
const searchButton = document.querySelector('#anime-search-button');
const loadMoreButton = document.querySelector('#load-more-button');

let currentPage = 1;
let currentSearchQuery = '';
let hasNextPage = true;

const BASE_URL = 'https://api.jikan.moe/v4/anime';

function renderAnimeCards(animes, append = true) {
    if (!append) {
        animeListGrid.innerHTML = '';
    }

    if (animes.length === 0 && !append) {
        animeListGrid.innerHTML = '<p>No anime found. Try a different search!</p>';
        loadMoreButton.style.display = 'none';
        return;
    }

    animes.forEach(anime => {
        const animeCard = document.createElement('div');
        animeCard.classList.add('anime-card');

        const title = anime.title_english || anime.title || anime.title_japanese;
        const imageUrl = anime.images.webp?.image_url || anime.images.jpg?.image_url;

        animeCard.innerHTML = `
                <img src="${imageUrl}" alt="${title}" loading="lazy" width="200" height="300">
                <h3>${title}</h3>
                <p class="anime-genres">${anime.genres.map(g => g.name).join(', ') || 'N/A'}</p>
                <p class="anime-score">Rating: ${anime.score || 'N/A'}</p>
                <a href="anime-detail.html?mal_id=${anime.mal_id}" class="details-button">View Details</a>
            `;
        animeListGrid.appendChild(animeCard);
    });

    loadMoreButton.style.display = hasNextPage ? 'block' : 'none';
}

async function fetchAnime(query = '', page = 1) {
    if (page === 1) {
        animeListGrid.innerHTML = '<p>Loading anime...</p>';
    }
    loadMoreButton.style.display = 'none';

    let url = `${BASE_URL}?page=${page}`;
    if (query) {
        url += `&q=${encodeURIComponent(query)}`;
    }
    url += '&sfw=false';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 429) {
                const retryAfter = response.headers.get('Retry-After');
                console.warn(`Jikan API Rate Limit Exceeded. Retrying after ${retryAfter || 5} seconds.`);
                animeListGrid.innerHTML = `<p>Too many requests to Jikan API. Please try again in a moment. </p>`;
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return;
        }

        const data = await response.json();
        const animes = data.data;
        hasNextPage = data.pagination?.has_next_page || false;

        renderAnimeCards(animes, page !== 1);
    } catch (error) {
        console.error('Error fetching anime:', error);
        animeListGrid.innerHTML = '<p>Failed to load anime. Please try again later.</p>';
        loadMoreButton.style.display = 'none';
    }
}

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query !== currentSearchQuery) {
        currentSearchQuery = query;
        currentPage = 1;
        fetchAnime(currentSearchQuery, currentPage);
    }
});

// Event Listener for Enter key in search input
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});

loadMoreButton.addEventListener('click', () => {
    if (hasNextPage) {
        currentPage++;
        fetchAnime(currentSearchQuery, currentPage);
    }
});


fetchAnime('', currentPage);