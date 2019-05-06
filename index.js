var express = require('express')
var Feed = require('rss-to-json');
var DataTransform = require("node-json-transform").DataTransform
var app = express()
const parser = require('rss-url-parser')

app.get('/cryptonews', function (req, res) {
  // console.log('started')
  Feed.load('https://cryptonews.com/news/feed', function (err, rss) {
    // res.json(rss)
    // console.log(rss)
    var map = {
      list: "items",
      item: {
        title: "title",
        description: "description",
        publishedAt: "created",
        url: "url",
        urlToImage: "enclosures.0.url",
        "source": "crypto news"
      }, operate: [

        {
          run: function (val) { return new Date(+val) }, on: "publishedAt"
        }, {
          run: function (val) { return { name: 'Cryto news' } }, on: "source"
        }
      ], each: function (item) {
        // make changes
        item.iterated = true;
        return item;
      }
    };
    var result = DataTransform(rss, map).transform();

    res.json(result);

  });


})

app.get('/oilprice', function (req, res) {


  Feed.load(' https://oilprice.com/rss/main', function (err, rss) {

    var map = {
      list: "items",
      item: {
        title: "title",
        description: "description",
        publishedAt: "created",
        url: "url",
        urlToImage: "enclosures.0.url",
        "source": "crypto news"
      }, operate: [

        {
          run: function (val) { return new Date(+val) }, on: "publishedAt"
        }, {
          run: function (val) { return { name: 'oilprice.com' } }, on: "source"
        }
      ]
    };
    var result = DataTransform(rss, map).transform();

    res.json(result);
  });


})
app.get('/nation', function (req, res) {



  parser('https://www.nation.co.ke/1148-2613630-view-asFeed-iahce3/index.xml').then((data) => {

    // res.json(data)

    var map = {
      list: "",
      item: {
        title: "title",
        description: "description",
        publishedAt: "pubdate",
        url: "link",
        urlToImage: "enclosures.0.url",
        "source": "crypto news"
      }, operate: [

        {
          run: function (val) { return { name: 'www.nation.co.ke' } }, on: "source"
        }
      ]
    };
    var result = DataTransform(data, map).transform();

    res.json(result);

  })
})

app.get('/kitco', function (req, res) {
  parser('https://news.kitco.com/rss/').then((data) => {

    // res.json(data)

    var map = {
      list: "",
      item: {
        title: "title",
        description: "description",
        publishedAt: "pubdate",
        url: "link",
        urlToImage: "enclosures.0.url",
        "source": "crypto news"
      }, operate: [

        {
          run: function (val) { return { name: 'nation daily' } }, on: "source"
        }
      ]
    };
    var result = DataTransform(data, map).transform();

    res.json(result);

  })
})

app.get('/businesslive', function (req, res) {
  
  parser('https://www.businesslive.co.za/rss/?publication=bl').then((data) => {

     //res.json(data)

    var map = {
      list: "",
      item: {
        title: "title",
        description: "description",
        publishedAt: "pubdate",
        url: "link",
        urlToImage: "rss:image.url.#",
        source: "meta.title"
      }, operate: [

        {
          run: function (val) { return { name: val } }, on: "source"
        }
      ]
    };
    var result = DataTransform(data, map).transform();

    res.json(result);

  })
})



app.listen(3000)