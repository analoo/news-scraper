let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/mongoHeadlines", {
  useNewUrlParser: true,
  useFindAndModify: false
});


// clears existing database
db.Article.deleteMany({})
  .then(data => {
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
