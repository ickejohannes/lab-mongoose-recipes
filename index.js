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

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    Recipe.create(recipe)
      .then(({title}) => console.log(title));
  })
  .then(() => {
    Recipe.insertMany(data)
      .then(result => {
        result.forEach(({ title }) => {
          console.log(title)
        })
      })
      .then(() => {
        Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
          .then(() => console.log("successfully updated Rigatoni!"));
      })
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


