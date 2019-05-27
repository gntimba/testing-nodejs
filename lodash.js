var _ = require('lodash');
const fs = require('fs');
let jsonData = require('./data.equities.json');
//let rawdata = fs.readFileSync('data.equities.json');  
///let student = JSON.parse(rawdata);  
console.log(jsonData.length);
jsonData = _.uniqBy(jsonData) 
let data = JSON.stringify(jsonData);
fs.writeFileSync('student-2.json', data); 

let jsonData2 = require('./student-2.json');
console.log(jsonData2.length);