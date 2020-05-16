var axios = require("axios");
var cheerio = require("cheerio");
var path = require("path")



module.exports = function (app) {
    app.get("/", function(req,res) {
        res.sendFile(path.join(__dirname,"../public/html/index.html"))
    })

    app.get("api/nyt", function (req, res) {
        axios.get("https://www.nytimes.com/")
        
        .then(function (response) {
            var $ = cheerio.load(response.data);
            let data = []

            $("Article").each(function(i, element) {

                let article = {
                    headline: $("h2",element).text(),
                    summary: $("p",element).text(),
                    URL: "https://www.nytimes.com/" + $("a",element).attr("href")
                }

                data.push(article)
                
            });
            return data
        })
        .catch(err => {
            console.log(err)
        });
    });

}