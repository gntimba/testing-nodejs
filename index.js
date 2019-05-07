var express = require('express')
var Feed = require('rss-to-json');
var DataTransform = require("node-json-transform").DataTransform
var app = express()
const parser = require('rss-url-parser')
const _async = require("async");
let log4js = require("log4js");
let logger = log4js.getLogger("News fetch");
logger.level = "debug";

app.get('/cryptonews', function (req, res) {
  var newArray = []
  _async.waterfall(
    [
      function crypto(next) {
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
          newArray = DataTransform(rss, map).transform();
          // res.json(result);
          next(null,newArray );
        });
      },
      function oilprice(newArray, next) {
        
        Feed.load('https://oilprice.com/rss/main', function (err, rss) {

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
          result.forEach(function (item) {
      
            newArray.push(item);
          });
          next(null, newArray);
        })
         
         
      },
      function nation(newArray, next) {
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
          result.forEach(function (item) {
      
            newArray.push(item);
          });
      
        })
        next(null, newArray);
        },function bdlive(newArray, next){
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
           result.forEach(function (item) {
             newArray.push(item);
           });
          
        
         })
         next(null, newArray);
        },function kitco(newArray, next){
          parser('https://news.kitco.com/rss/').then((data) => {


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
                  run: function (val) { return { name: 'Kitco' } }, on: "source"
                }
              ]
            };
            var result = DataTransform(data, map).transform();
            result.forEach(function (item) {
              newArray.push(item);
            });
            res.json(newArray);
          })
          
          next(null, 'done fetching news');
        }
    ],
    function Done(err, result) {
      logger.debug(err, result);
    }
  );


  
})

app.listen(3000)