var path = require("path")



module.exports = function (app) {

    // sets index.html as the root page
    app.get("/", function(req,res) {
        res.sendFile(path.join(__dirname,"../public/html/index.html"))
    })

    

}