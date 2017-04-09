module.exports = function(app, models) {

    var userModel = models.userModel;

    app.post("/api/user", createUser);
    app.get("/api/user", findUserById);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res) {
        var newUser = req.body;
        newUser.count = 1;
        userModel.createUser(newUser)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.query.userId;
        console.log("findUserById" + userId);
        userModel.findUserById(userId)
            .then(
                function(user) {
                    if (!user.id) {
                        res.send({});
                    } else {
                        userModel.updateUser(user._id, user)
                            .then(function(newUser) {
                                console.log(newUser.count);
                                res.send(newUser);
                            });
                    }
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deleteUser(req, res) {
        var id = req.params.userId;

        userModel.deleteUser(id)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }
};
