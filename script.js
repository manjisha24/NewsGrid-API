const API_KEY="73206755be89e7774425572f72c7aaea";
const url="https://gnews.io/api/v4/";

window.addEventListener('load', ()=>fetchNews("Current Affairs"));

async function fetchNews(query) {
    const res = await fetch(`${url}top-headlines?token=${API_KEY}&q=${query}`);
    const data = await res.json();
    bindData(data.articles);
    console.log(data);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.image) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.image;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_self");
    });
}
let currentselectednav=null;
function onnavitemclick(id){
    fetchNews(id);
    const navitem=document.getElementById(id);
    currentselectednav?.classList.remove('active');
    currentselectednav=navitem;
    currentselectednav.classList.add('active');
}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');

searchButton.addEventListener('click', ()=>{
    const query=searchText.value;
    if(!query)return;
    fetchNews(query);
    currentselectednav?.classList.remove('active');
    currentselectednav=null;
})