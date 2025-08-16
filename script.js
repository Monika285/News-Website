const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

const apiKey = 'b1382480f8acf2296113928b601286fe'; 

async function fetchNews(query = '') {
    try {
        let url = `https://gnews.io/api/v4/top-headlines?token=${apiKey}&lang=en&country=in&max=12`;
        if (query) {
            url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&token=${apiKey}&max=12&lang=en`;
        }

        console.log("Fetching URL:", url); 

        const response = await fetch(url);
        const data = await response.json();

    if (data.articles && data.articles.length > 0) {
    displayArticles(data.articles);
    } else if (query) {
    fetchNews('');
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
            <img src="${article.image || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="${article.title}">
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


