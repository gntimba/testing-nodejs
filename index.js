var express = require('express')
var Feed = require('rss-to-json');
var DataTransform = require("node-json-transform").DataTransform
var app = express()
 
app.get('/cryptonews', function (req, res) {
   // console.log('started')
    Feed.load('https://cryptonews.com/news/feed', function(err, rss){
       // res.json(rss)
       // console.log(rss)
       var map = {
           list:"items",
           item:{
        title:"title",
        description:"description",
        publishedAt: "created",
        url:"url",
        urlToImage:"enclosures.0.url",
        "source":"crypto news"
      },operate:[
        
        {
            run: function(val) { return  new Date(+val)}, on: "publishedAt"
        }, {
            run: function(val) { return  {name:'Cryto news'}}, on: "source"
        }
      ] , each: function(item){
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
   

    Feed.load(' https://oilprice.com/rss/main', function(err, rss){

        var map = {
            list:"items",
            item:{
         title:"title",
         description:"description",
         publishedAt: "created",
         url:"url",
         urlToImage:"enclosures.0.url",
         "source":"crypto news"
       },operate:[
         
         {
             run: function(val) { return  new Date(+val)}, on: "publishedAt"
         }, {
             run: function(val) { return  {name:'oilprice.com'}}, on: "source"
         }
       ] , each: function(item){
         // make changes
         item.iterated = true;
         return item;
     }
     };
     var result = DataTransform(rss, map).transform();

        res.json(result);
    });

 })
app.listen(3000)