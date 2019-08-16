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
            //let products= result.rss.channel[0].item[0]['g:description'][0].replace(/<\/?[^>]+(>|$)/g, "")
            let products= result.rss.channel[0].item
            // console.log(products.length)
             //res.json(products)
            let entries = { entries: [] }
            
            for (let index = 0; index < products.length; index++) {
              let price = products[index]['g:price'][0].split(' ')
              const params = {
                merchantId: 134645521,
                batchId: index + 1,
                method: "insert",
                product: {
                  channel: "online",
                  contentLanguage: "en",
                  offerId: products[index]['g:id'][0],
                  targetCountry: "ZA",
                  brand: products[index]['g:brand'][0],
                  title: products[index]['g:title'][0].replace(/<\/?[^>]+(>|$)/g, ""),
                  link: products[index]['g:link'][0],
                  description: products[index]['g:description'][0].replace(/<\/?[^>]+(>|$)/g, ""),
                  imageLink: products[index]['g:image_link'][0],
                  productTypes:[ products[index]['g:google_product_category'][0]],
                  price: {
                    currency: price[1],
                    value: price[0]
                  },
                  availability: products[index]['g:availability'][0],
                  condition:products[index]['g:condition'][0]
                
                }
              };
      
              entries.entries.push(params)
            
            }
            res.json(entries)
            
        })
    })
      
  })

  app.listen(3000)