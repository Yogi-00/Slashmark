const mongoose = require("mongoose");

const mongoURI =
  "mongodb://yogiyugandhar7:Yogi123@ac-95klawv-shard-00-00.lplcogn.mongodb.net:27017,ac-95klawv-shard-00-01.lplcogn.mongodb.net:27017,ac-95klawv-shard-00-02.lplcogn.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-zrzz53-shard-0&authSource=admin&retryWrites=true&w=majority";

const mongoDb = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");

    const foodItems = await mongoose.connection.db
      .collection("food_items")
      .find({})
      .toArray();
    global.food_items = foodItems;
    // console.log(global.food_items);

    const foodCategory = await mongoose.connection.db
      .collection("foodCategory")
      .find({})
      .toArray();
    global.food_cat = foodCategory;
    // console.log(global.food_cat);
  } catch (err) {
    console.error("Error connecting to MongoDB or fetching data:", err);
  }
};

mongoose.set("strictQuery", false);

module.exports = mongoDb;
