module.exports = function() {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/SquadApp');

    var models = {
        userModel: require("./user.model.server")()
    };
    return models;
};
