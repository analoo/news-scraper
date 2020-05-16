var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");





module.exports = function (app) {

app.get("/api/articles/all", (req,res) => {
    db.Article.find({})
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
      { $push: { comments: req.body } },
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
    console.log(res)
    db.Article.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: {  comments: {_id: req.body._id} }}, 
      { safe: true, multi:true })
      .then(result => {
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

  app.get("/api/articles", (req, res) => {
    axios.get("https://www.nytimes.com/")
      .then(function (response) {
        var $ = cheerio.load(response.data);

        $("Article").each(function (i, element) {
          let article = {
            headline: $("h2", element).text(),
            summary: $("p", element).text(),
            URL: "https://www.nytimes.com/" + $("a", element).attr("href")
          }
          db.Article.create(article)
            .then(result => {
              res.json(result)
            })
            .catch(err => {
              res.json(err);
            });
        })
      })
      .catch(err => {
        console.log(err)
      });

  });

}