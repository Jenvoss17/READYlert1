var mysql = require("mysql");
var connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection({
        host: process.env.PROD_DATABASE_HOST,
        port: process.env.PROD_DATABASE_PORT,
        user: process.env.PROD_DATABASE_USER,
        password: process.env.PROD_DATABASE_PASS,
        database: process.env.PROD_DATABASE_NAME,
        multipleStatements: true
    });
} else {
    connection = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
        multipleStatements: true
    });
}


// Connect to the database
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// Export connection
module.exports = connection;