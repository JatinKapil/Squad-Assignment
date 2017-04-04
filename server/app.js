module.exports = function(app) {

    var models = require("./models/models.server.js")();

    require("./services/user.service.server.js")(app, models);

    app.get("/users", function(req, res) {
        res.sendStatus(200);
        console.log("Successful Get");
    });

};
