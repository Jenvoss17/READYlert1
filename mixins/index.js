const connection = require('../config/connection.js');

/* For GET requests only */
const makeGetQuery = (res, query, params = []) => {
    connection.query(query, params, function (err, result) {
        if (err) {
            res.status(500);
            res.send({ status: 'error', message: 'db_error' })
            console.log(err)
        }
        res.status(200);
        if (result.length === 1) {
            res.send(result[0]);
        } else {
            res.send(result);
        }
    });
}

/*  
    For POST, PUT, UPDATE, DELETE 
    TODO: customize and do this in each function so we can pass back relevant information like userID on insert or changedRows on update, etc.
*/
const makeQuery = (res, query, params = []) => {
    connection.query(query, params, function (err, result) {
        if (err) {
            res.status(500);
            res.send({ status: 'error', message: 'db_error' })
            console.log(err)
        }
        res.status(200);
        res.send(result);
    });
}

// select certain fields with &fields[]=example
const getFields = (req, model) => {
    let selectFields = model.allFields;
    // check if fields[]= is a valid field in allFields - prevent SQL attacks
    if (req.query && req.query.fields) {
        model.selectFields = model.selectFields.filter(field => {
            return req.query.fields.indexOf(field) !== -1;
        })
    }
    return selectFields;
}

module.exports = {
    makeGetQuery,
    makeQuery,
    getFields
}