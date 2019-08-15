const express = require('express')
const app = express()
const axios = require('axios');
var parseString = require('xml2js').parseString;




  function axiosTest() {
    console.log('geting data from the server')
    var options=
      {
        method: 'get',
        url: 'https://www.buynow.co.za/Export.aspx?key=11',
        timeout: 180000, // Let's say you want to wait at least 180 seconds
      }
    
    return axios(options).then(response => {
      // returning the data here allows the caller to get it through another .then(...)
      //console.log(response.data)
      console.log('done geting data')
      return response.data
    })
  }


  app.get('/data',function  (req, res){

    axiosTest().then(data => {
        parseString(data, function (err, result) {
            //let products= result.rss.channel[0].item[0]['g:google_product_category']
            let products= result.rss.channel[0].item
            console.log(products.length)
            res.json(products)
            
        })
    })
      
  })

  app.listen(3000)