const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("shopDB");
    const products = database.collection("products");

    // Query for a movie that has the title 'Back to the Future'
    const query = { name: "pencil2" };
    const product = await products.findOne(query);
    console.log(product);

    //Add an entry to the DB
    const doc = { name: "Neapolitan pizza", price: 20 };
    const result = await products.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);

    //Delete the above entry
    const deleteEntry = { _id: result.insertedId };
    const deleteResult = await products.deleteOne(deleteEntry);
    console.log(`A deleted successfully: ${deleteResult.acknowledged}`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
