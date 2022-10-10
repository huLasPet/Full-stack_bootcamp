//https://mongoosejs.com/docs/
const mongoose = require("mongoose");

async function main() {
  //Connect to DB if it exists, creates it if it doesn't
  await mongoose.connect("mongodb://localhost:27017/shopDB");

  //Schema is how the table/collection looks like
  const shopSchema = new mongoose.Schema({
    name: String,
    price: Number,
  });

  //Create a model based on the Schema, this will be the name of the table/collection in the DB -
  //"Product" for example which will get converted to "products" automatically by mongo
  const shopItem = mongoose.model("Product", shopSchema);

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

//main().catch((err) => console.log(err));

//---------------------------------------------------------------------
//Separate challange

async function challange() {
  //Connect
  await mongoose.connect("mongodb://localhost:27017/personDB");

  //Basic Schema
  const favItemSchema = new mongoose.Schema({
    name: String,
  });

  //Schema with validation between {}, favoriteItem references another table
  //https://dev.to/alexmercedcoder/mongodb-relationships-using-mongoose-in-nodejs-54cc
  const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteItem: favItemSchema,
  });

  //Model
  const favItemModel = mongoose.model("Item", favItemSchema);
  const personModel = mongoose.model("Person", personSchema);

  //Create and save - use await or in the Display items section it will not display what was saved here
  //newFavItem could be a search result in the DB as well, not just a new item
  const newFavItem = new favItemModel({ name: "Brick" });
  //await newFavItem.save();
  const newPerson = new personModel({
    name: "Sanyi5",
    age: 99,
    favoriteItem: newFavItem,
  });
  await newPerson.save();

  //Display items
  const displayPerson = await personModel.find();
  displayPerson.forEach((element) => {
    console.log(element.name);
  });

  //Modify entry
  const modifyPerson = await personModel.findOne({ name: "Sanyi2" });
  //modifyPerson.name = "Geza";
  //modifyPerson.favoriteItem = newFavItem;
  //modifyPerson.save();

  //Another way to update -- ({filter}, {update})
  const anotherUpdate = await personModel.updateOne({ _id: "6343d9e3042576c693b157cb" }, { favoriteItem: newFavItem });

  //Delete 1 entry with basic feedback
  const deletePerson = personModel.deleteOne({ name: "Jozsi" });
  console.log("User deleted: ", await deletePerson);

  //Delete many
  const deleteManyPpl = personModel.deleteMany({ name: "Sanyi5" });
  console.log("Users deleted: ", await deleteManyPpl);

  //Close connection
  mongoose.connection.close();
}

challange().catch((err) => console.log(err));
