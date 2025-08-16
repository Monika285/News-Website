const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');


const apiKey = '619b988821f54e59b93ec6327aa6700e';


async function fetchNews(query = '') {
    try {
        let url = `https://newsapi.org/v2/top-headlines?country=in&pageSize=12&apiKey=${apiKey}`;
        if (query) {
            url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=12&apiKey=${apiKey}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'ok') {
            displayArticles(data.articles);
        } else {
            newsContainer.innerHTML = `<p>Error fetching news: ${data.message}</p>`;
        }
    } catch (error) {
        newsContainer.innerHTML = `<p>Error fetching news: ${error}</p>`;
        console.error(error);
    }
}

function displayArticles(newsArticles) {
    newsContainer.innerHTML = '';
    if (!newsArticles.length) {
        newsContainer.innerHTML = '<p>No articles found.</p>';
        return;
    }
    newsArticles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article';
        articleElement.innerHTML = `
            <img src="${article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p>${article.description || ''}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(articleElement);
    });
}


searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    fetchNews(query);
});
fetchNews();


