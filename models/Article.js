const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    headline: {type:String, unique:true, minlength:1},
    summary: String,
    URL: String,
    // there is a one to many relationship between article and comments
    comments: [{
        comment: String
    }]

});


const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
