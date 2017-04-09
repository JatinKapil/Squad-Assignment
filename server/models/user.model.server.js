module.exports = function() {
    var mongoose = require('mongoose');
    var q = require('q');
    mongoose.Promise = q.Promise;

    var UserSchema = mongoose.Schema({
        name: String,
        id: String,
        picture: Object,
        count: Number
    });

    var User = mongoose.model("User", UserSchema);
    var api = {
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser
    };
    return api;

    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findOne({
            id: userId
        });
    }

    function updateUser(id, user) {
        newCount = user.count + 1;
        return User.findByIdAndUpdate(id, {
            count: newCount
        });
    }
};
