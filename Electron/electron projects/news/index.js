const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("7a2d1c25ce724b4ca28e4b34d1d24f19");
const $ = require("jquery");
let navItems = $('.nav-group-item')
let articles = null


getNews('business')

function getNews(category){
    newsapi.v2.topHeadlines({
        category: category,
        language: 'en',
        country: 'us'
    }).then((results) => {
        console.log(results.articles)
        articles = results.articles
        showNews(results.articles)
    }).catch((err) => {
        console.log(err)
    })
}

function showNews(allNews){
    $('#news-list').html('')
    $('#news-list').append(`
    <li class="list-group-header">
        <input class="form-control" type="text" value="" placeholder="Search for news" onchange="search(this)">
    </li>
    
    `)
    allNews.forEach(news =>{

        let singleNews = `
        <li class="list-group-item">
            <img class="img-circle media-object pull-left" src="${news.urlToImage}" width="50" height="50">
            <div class="media-body">
                <strong><a href="${news.url}" onclick="openArticle(event)">${news.title}</a></strong>
                <div>
                    <span class="">${news.publishedAt}</span>
                    <span class="pull-right">Author: ${news.author}</span>
                </div>
                <p>${news.description}</p>
            </div>
        </li>
        `
        $('#news-list').append(singleNews)

    })
}

function openArticle(event){
    event.preventDefault()
    let link = event.target.href
    window.open(link)
}

navItems.click((event)=>{
    let category = event.target.id
    navItems.removeClass('active')
    $(event.target).addClass('active')
    getNews(category)
})

function search(input){
    let query = $(input).val()
    let sortedArticles = articles.filter((item)=>item.title.toLowerCase().includes(query.toLowerCase()))
    showNews(sortedArticles)
}