const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const recipe = {
  title: "YummyPie",
  level: "Amateur Chef",
  ingredients: ["Yummy potatoes", "yummy fish"],
  cuisine: "Asian",
  dishType: "breakfast",
  duration: 5,
  creator: "Eric&Johannes"
}

async function doLab() {
  try {
    const x = await mongoose.connect(MONGODB_URI);
    await Recipe.deleteMany();
    console.log(`connected to the database: ${x.connection.name}`)
    let result = await Recipe.create(recipe);
    console.log(result.title);
    result = await Recipe.insertMany(data);
    result.forEach(({ title }) => {
      console.log(title)
    })
    await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 });
    const rigatoni = await Recipe.find({ title: "Rigatoni alla Genovese" });
    if (rigatoni[0].duration == 100) {
      console.log("success")
    }
    await Recipe.deleteOne({ title: "Carrot Cake" })
    const carrotCakeStillThere = await Recipe.find({ title: "Carrot Cake" })
    if (carrotCakeStillThere.length == 0) {
      console.log("Successfully deleted Carrot Cake.");
    }
    await mongoose.disconnect(MONGODB_URI);
  } catch (error){
    console.log(error);
  }
}

doLab();


