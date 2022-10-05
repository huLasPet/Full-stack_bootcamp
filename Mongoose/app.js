//https://mongoosejs.com/docs/
const mongoose = require("mongoose");

async function main() {
  //Connect to DB
  await mongoose.connect("mongodb://localhost:27017/shopDB");

  //Schema is the table/collection
  const shopSchema = new mongoose.Schema({
    name: String,
    price: Number,
  });

  //Create a model based on the Schema, this will be the name of the table/collection in the DB - "products"
  const shopItem = mongoose.model("products", shopSchema);

  //Create new entry with the model and save it - commented out
  const testItem = new shopItem({ name: "Test Item 1", price: 2 });
  //testItem.save();

  //Get all entries
  const getItems = await shopItem.find();
  console.log("All items:");
  console.log(getItems);

  //Filter for specific items
  const getSomeItems = await shopItem.find({ price: 2 });
  console.log("Some items:");
  console.log(getSomeItems);
}

main().catch((err) => console.log(err));
