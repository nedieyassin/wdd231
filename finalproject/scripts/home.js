async function loadTrendingAnime() {
    const trendingAnimeGrid = document.getElementById('trending-anime-grid');
    if (!trendingAnimeGrid) return;

    try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=6&order_by=popularity&sfw=false');

        if (!response.ok) {
            if (response.status === 429) {
                const retryAfter = response.headers.get('Retry-After');
                trendingAnimeGrid.innerHTML = `<p>Too many requests to Jikan API. Please try again in a moment. </p>`;
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return;
        }

        const data = await response.json();
        const animes = data.data;

        const anime = animes[Math.floor(Math.random() * animes.length)];

        if (anime) {
            const heroSection = document.getElementById('hero-section');
            if (!heroSection) return;

            const image = document.createElement('img');
            image.src = anime.images.webp?.image_url || anime.images.jpg.image_url;
            image.alt = "Hero Anime";
            image.classList.add("hero-background");

            heroSection.prepend(image);
        }

        if (animes && animes.length > 0) {
            trendingAnimeGrid.innerHTML = '';
            animes.forEach(anime => {
                const animeCard = document.createElement('div');

                animeCard.classList.add('anime-card');
                const title = anime.title_english || anime.title || anime.title_japanese;

                const imageUrl = anime.images.webp?.image_url || anime.images.jpg.image_url;

                animeCard.innerHTML = `
                        <img src="${imageUrl}" alt="${title}" loading="lazy" width="200" height="300">
                        <h3>${title}</h3>
                        <p class="anime-genres">${anime.genres.map(g => g.name).join(', ')}</p>
                        <p class="anime-score">Rating: ${anime.score || 'N/A'}</p>
                        <a href="anime-detail.html?mal_id=${anime.mal_id}" class="details-button">View Details</a>
                    `;
                trendingAnimeGrid.appendChild(animeCard);
            });
        } else {
            trendingAnimeGrid.innerHTML = '<p>No trending anime found at this time.</p>';
        }
    } catch (error) {
        console.error('Error fetching trending anime:', error);
        trendingAnimeGrid.innerHTML = '<p>Failed to load trending anime. Please try again later.</p>';
    }
}


async function loadLatestRecommendations() {
    const recListDiv = document.getElementById('latest-recommendations-list');
    if (!recListDiv) return;

    recListDiv.innerHTML = '<p>Latest recommendations from our members will appear here!</p>';

    try {
        const response = await fetch('https://api.jikan.moe/v4/recommendations/anime?limit=3');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const recommendations = data.data.slice(0, 3);

        if (recommendations && recommendations.length > 0) {
            recListDiv.innerHTML = ''; // Clear loading message
            recommendations.forEach(rec => {
                const title = rec.entry[0].title

                const recCard = `
                    <div class="recommendation-card">
                        <h3>${title}</h3>
                        <p class="recommender">Recommended by <span >${rec.user.username}</span></p>
                        <p class="review">"${rec.content}"</p>
                    </div>
                `;
                recListDiv.insertAdjacentHTML('beforeend', recCard);
            });
        } else {
            recListDiv.innerHTML = '<p>Be the first to recommend an anime or manga!</p>';
        }
    } catch (error) {
        console.error('Error loading recommendations:', error);
        recListDiv.innerHTML = '<p>Failed to load latest recommendations.</p>';
    }

}


loadTrendingAnime();
loadLatestRecommendations();
