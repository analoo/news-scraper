const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    headline: String,
    summary: String,
    URL: String,
    // photo: String,
    comments: [{
        comment: String
    }]

});


const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
