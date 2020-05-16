var db = require("../models");



module.exports = function (app) {

  app.get("/api/articles", (req, res) => {

    db.Article.find({}, {})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  });



// create comment
  app.put("/api/articles/:id", (req, res) => {
    db.Article.findOneAndUpdate(
      { _id: req.params.id }, 
      {$push: { comments: req.body }} ,
      { new: true }
      ).then(result => {
        console.log(result)
        res.json(result)
      }).catch(err => {
        res.json(err)
      });
  });

  // create delete comment
  app.put("/api/articles/:id/remove", (req, res) => {
    db.Article.findOneAndUpdate(
      { _id: req.params.id }, 
      {$pull: { _id: req.body }} ,
      { new: true }
      ).then(result => {
        console.log(result)
        res.json(result)
      }).catch(err => {
        res.json(err)
      });
  });

//   creates multiple articles
  app.post("/api/article", (req, res) => {
    db.Article.insertMany(req.body)
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        res.json(err);
      });
  })

 
}