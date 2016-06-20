module.exports = function(app, userModel, passport) {

    var models = require("./models/models.server")();

    require("./services/user.service.server.js")(app, userModel, passport);
    require("./services/game.service.server.js")(app, models);
    require("./services/review.service.server.js")(app, models);
};