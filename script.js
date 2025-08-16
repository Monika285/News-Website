const feedUrl = 'https://feeds.bbci.co.uk/news/rss.xml';
const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`;

fetch(proxyUrl)
  .then(res => res.json())
  .then(data => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data.contents, "text/xml");
      const items = xmlDoc.querySelectorAll("item");
      items.forEach(item => {
          console.log(item.querySelector("title").textContent);
      });
  });
