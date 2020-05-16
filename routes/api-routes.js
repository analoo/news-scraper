var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");





module.exports = function (app) {

  // gets all articles
  app.get("/api/articles/all", (req, res) => {
    db.Article.find({})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  });


  // creates comment for the provided article ID
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

  // deletes a comment for the provided article using the article's id and the comment's id
  app.put("/api/articles/:id/remove", (req, res) => {
    console.log(res)
    db.Article.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { comments: { _id: req.body._id } } },
      { safe: true, multi: true })
      .then(result => {
        console.log(result)
        res.json(result)
      }).catch(err => {
        res.json(err)
      });
  });

  //   creates multiple articles at once. Ideal for a scrape
  app.post("/api/article", (req, res) => {
    db.Article.insertMany(req.body)
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        res.json(err);
      });
  })

  // makes the request to the nytimes page for the scraping

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