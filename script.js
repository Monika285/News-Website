const apiKey = 'pub_25b285170f7842f8afbb3844c6cc13d6'; 
const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

async function fetchNews(query = '') {
    try {
        let url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en`;

        if (query) {
            url += `&q=${encodeURIComponent(query)}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'ok' && data.results.length > 0) {
            displayArticles(data.results);
        } else {
            newsContainer.innerHTML = '<p>No articles found.</p>';
        }
    } catch (error) {
        newsContainer.innerHTML = `<p>Error fetching news: ${error}</p>`;
        console.error(error);
    }
}

function displayArticles(newsArticles) {
    newsContainer.innerHTML = '';
    newsArticles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article';
        articleElement.innerHTML = `
            <img src="${article.image_url || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p>${article.description || ''}</p>
            <a href="${article.link}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(articleElement);
    });
}

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    fetchNews(query);
});

fetchNews(); 

