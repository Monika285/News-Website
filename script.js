const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// List of RSS feeds
const feeds = [
    'https://feeds.bbci.co.uk/news/rss.xml',
    'https://www.theguardian.com/world/rss'
];

let allArticles = [];

// Fetch and parse RSS feeds
async function fetchNews() {
    allArticles = [];
    newsContainer.innerHTML = '<p>Loading news...</p>';

    for (const feed of feeds) {
        const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                allArticles = allArticles.concat(data.items);
            }
        } catch (error) {
            console.error('Error fetching feed:', error);
        }
    }

    displayArticles(allArticles);
}

// Display articles
function displayArticles(articles) {
    newsContainer.innerHTML = '';

    if (!articles.length) {
        newsContainer.innerHTML = '<p>No articles found.</p>';
        return;
    }

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article';
        articleElement.innerHTML = `
            <img src="${article.thumbnail || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p>${article.description || ''}</p>
            <a href="${article.link}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(articleElement);
    });
}

// Search functionality
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        displayArticles(allArticles);
        return;
    }
    const filtered = allArticles.filter(article => 
        article.title.toLowerCase().includes(query) ||
        (article.description && article.description.toLowerCase().includes(query))
    );
    displayArticles(filtered);
});

fetchNews();
