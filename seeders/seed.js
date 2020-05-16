let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/mongoHeadlines", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// let articleSeed = [
//     {headline: "test headline",
//         summary: "summary",
//         URL: "hhtps/test",
//         comments: [{
//             comment: "That's awesome"
//         }]
//     },
//     {headline: "This is a great article",
//     summary: "massively lond description",
//     URL: "hhtps/test",
//     comments: [{
//         comment: "That's awesome"
//     }]
// }]

db.Article.deleteMany({})
  // .then(() => db.Article.collection.insertMany(articleSeed))
  .then(data => {
    // console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
