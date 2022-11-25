const csv = require('csv-parser')
const fs = require('fs')
const path = require('path');
const moment = require("moment");

const output = [];
const file = process.argv[2];
const obj = require('./performance.json');

fs.createReadStream(path.join(__dirname, file))
  .pipe(csv())
  .on('data', (data) => {
    try {
      output.push([
        moment(data['Date'], 'DD-MMMM-YYYY').toDate().getTime(),
        parseFloat(data['Total BTC Balance']),
      ])
    } catch(e) {
      console.log(data['Date']);
    }
  })
  .on('end', () => {
    obj.totalAum = output;
    fs.writeFileSync(path.join(__dirname, 'performance.json'), JSON.stringify(obj, undefined, 2));
  });
