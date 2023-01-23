const csvtojson = require('csvtojson');
const Products = require('./../../models/productSchema');

async function dbLoad(req, res) {
  try {
    console.log('dbload started');
    const dbFile = req.file;
    if (dbFile == undefined) {
      return res.status(400).send('Please upload a CSV file!');
    }

    //* validation to be implemented
    //let vaildationResult = await validateProductsFile(req)
    //if(vaildationResult.status == "fail") {
    //  return res.status(400).send("Upload valid file")
    //}

    csvtojson()
      .fromFile(`./uploads/searchspring.csv`)
      .then((csvData) => {
        // console.log(csvData);
        Products.insertMany(csvData, (err, res) => {
          if (err) throw err;

          console.log(`Inserted: ${res.insertedCount} rows`);
        });
      });

    res.status(200).send('insert Successul');
  } catch (err) {
    console.log('err ', err);
    res.status(500).send(err);
  }
}

module.exports = { dbLoad };
