var connection = require('./connection.js');

var tableName = "users";
var orm = {
    SelectAll: function (callback) {
        var query = "SELECT * FROM " + tableName;
        connection.query(query, function (err, result) {
            callback(result);
        });
    },
    SelectOne: function (callback) {
        var query = "SELECT * FROM " + tableName + "WHERE id=?";
        connection.query(query, function (err, result) {
            callback(result);
        });
    },
    InsertOne: function (user, callback) {
        var query = "INSERT INTO " + tableName + " (name, description, phone, address, picture) VALUES (?,?)";

        connection.query(query, [user.username, user.password], function (err, result) {
            callback(result);
        });
    },
    UpdateOne: function (user, callback) {
        var query = "UPDATE " + tableName + " SET text=? WHERE id=?";
        connection.query(query, [burger.text, burger.id], function (err, result) {
            callback(result);
        });
    }
};

module.exports = orm;

