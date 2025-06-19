async function fetchDetails() {

    const animeDetailContent = document.querySelector('#anime-detail-content');
    const BASE_URL = 'https://api.jikan.moe/v4';

    // Get mal_id from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const malId = urlParams.get('mal_id');

    if (!malId) {
        animeDetailContent.innerHTML = '<p>No anime ID provided. Please go back to the <a href="anime.html">Anime List</a>.</p>';
        return;
    }

    animeDetailContent.innerHTML = '<p>Loading anime details for ID: ' + malId + '...</p>';

    try {
        // Fetch full anime details
        const animeResponse = await fetch(`${BASE_URL}/anime/${malId}/full`);
        if (!animeResponse.ok) {
            if (animeResponse.status === 429) {
                const retryAfter = animeResponse.headers.get('Retry-After');
                animeDetailContent.innerHTML = `<p>Too many requests to Jikan API. Please try again in a moment. </p>`;
                console.warn(`Jikan API Rate Limit Exceeded. Retrying after ${retryAfter || 5} seconds.`);
                return;
            }
            if (animeResponse.status === 404) {
                animeDetailContent.innerHTML = `<p>Anime with ID "${malId}" not found.</p>`;
                return;
            }
            throw new Error(`HTTP error! status: ${animeResponse.status}`);
        }
        const animeData = (await animeResponse.json()).data;

        // Fetch characters
        const charactersResponse = await fetch(`${BASE_URL}/anime/${malId}/characters`);
        if (!charactersResponse.ok) {
            console.error(`Failed to fetch characters: HTTP error! status: ${charactersResponse.status}`);
        }
        const characterData = (await charactersResponse.json()).data;


        animeDetailContent.innerHTML = '';


        const title = animeData.title_english || animeData.title || animeData.title_japanese || 'Unknown Title';
        const japaneseTitle = animeData.title_japanese ? `(${animeData.title_japanese})` : '';
        const imageUrl = animeData.images.webp?.large_image_url || animeData.images.jpg?.large_image_url;
        const synopsis = animeData.synopsis || 'No synopsis available.';
        const score = animeData.score || 'N/A';
        const rank = animeData.rank ? `#${animeData.rank}` : 'N/A';
        const popularity = animeData.popularity ? `#${animeData.popularity}` : 'N/A';
        const episodes = animeData.episodes || 'N/A';
        const status = animeData.status || 'N/A';
        const airedString = animeData.aired?.string || 'N/A';
        const duration = animeData.duration || 'N/A';
        const rating = animeData.rating || 'N/A';
        const genres = animeData.genres.map(g => g.name).join(', ') || 'N/A';
        const studios = animeData.studios.map(s => s.name).join(', ') || 'N/A';
        const producers = animeData.producers.map(p => p.name).join(', ') || 'N/A';

        animeDetailContent.innerHTML = `
            <div class="detail-header">
                <h1>${title}</h1>
                <p class="anime-japanese-title">${japaneseTitle}</p>
            </div>

            <div class="detail-flex-container">
                <div class="detail-poster">
                    <img src="${imageUrl}" alt="${title} Poster" width="250" height="350">
                </div>
                <div class="detail-info">
                    <h3>Synopsis</h3>
                    <p class="synopsis">${synopsis}</p>

                    <div class="detail-meta-grid">
                        <div>
                            <h4>Score & Rank</h4>
                            <p><strong>Score:</strong> ${score}</p>
                            <p><strong>Rank:</strong> ${rank}</p>
                            <p><strong>Popularity:</strong> ${popularity}</p>
                        </div>
                        <div>
                            <h4>Episodes & Status</h4>
                            <p><strong>Episodes:</strong> ${episodes}</p>
                            <p><strong>Status:</strong> ${status}</p>
                            <p><strong>Aired:</strong> ${airedString}</p>
                        </div>
                        <div>
                            <h4>Duration & Rating</h4>
                            <p><strong>Duration:</strong> ${duration}</p>
                            <p><strong>Rating:</strong> ${rating}</p>
                        </div>
                        <div>
                            <h4>Genres</h4>
                            <ul>
                                ${animeData.genres.map(g => `<li>${g.name}</li>`).join('') || 'N/A'}
                            </ul>
                        </div>
                        <div>
                            <h4>Studio & Producers</h4>
                            <p><strong>Studio:</strong> ${studios || 'N/A'}</p>
                            <p><strong>Producers:</strong> ${producers || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </div>

            <section class="characters-section">
                <h2>Characters</h2>
                <div class="characters-grid" id="characters-grid">
                    ${characterData && characterData.length > 0 ? characterData.map(charItem => {
            const character = charItem.character;
            const charImageUrl = character.images.webp?.image_url || character.images.jpg?.image_url;

            return `
                                <div class="character-card">
                                    <img src="${charImageUrl}" alt="${character.name}" loading="lazy" width="100" height="100">
                                    <h4>${character.name}</h4>
                                    <p class="character-role">${charItem.role}</p>
                            
                                </div>
                            `;
        }).join('') : '<p>No main characters found for this anime.</p>'}
                </div>
            </section>
        `;


    } catch (error) {
        console.error('Error fetching anime details:', error);
        animeDetailContent.innerHTML = '<p>Failed to load anime details. Please check the ID or try again later.</p>';
    }
}

fetchDetails()