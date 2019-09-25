const Roster = require('../models/roster');
const connection = require('../config/connection.js');
const { makeGetQuery, makeQuery, getFields } = require('../mixins');

const roster = new Roster();

exports.list = (req, res) => {
    let selectFields = getFields(req, roster);
    const query = "SELECT " + selectFields.join(', ') + " FROM " + roster.table;

    makeGetQuery(res, query);
};

exports.get = (req, res) => {
    // let selectFields = getFields(req, roster);
    // const query = "SELECT " + selectFields.join(', ') + " FROM " + roster.table + " WHERE id=?";

    const query = "SELECT profiles.id, profiles.name, T.title FROM (SELECT rosters.title, profiles_rosters.profile_id FROM profiles_rosters INNER JOIN rosters ON rosters.id=?  AND profiles_rosters.roster_id=?) AS T INNER JOIN profiles ON profiles.id=T.profile_id;"
    makeGetQuery(res, query, [parseInt(req.params.rosterId), parseInt(req.params.rosterId)]);
};

exports.create = (req, res) => {
    const data = req.body || {};

    const requiredData = {};
    roster.requiredFields.forEach(field => {
        requiredData[field] = data[field];
    })

    const query = "INSERT INTO " + roster.table + " (" + roster.requiredFields.join(', ') + ") VALUES (" + roster.requiredFields.map(() => { return '?' }).join(', ') + ")";
    connection.query(query, Object.values(requiredData), function (err, result) {
        if (err) {
            res.status(500);
            res.send({ status: 'error', message: 'db_error' })
            console.log(err)
        }

        const query2 = [];
        const data2 = [];
        req.body.profiles.forEach(function (profile) {
            query2.push("INSERT INTO profiles_rosters (profile_id, roster_id) VALUES (?, ?)");
            data2.push(profile);
            data2.push(result.insertId);
        })


        connection.query(query2.join('; '), data2, function (e, r) {
            if (e) {
                res.status(500);
                res.send({ status: 'error', message: 'db_error' })
                console.log(e)
            }

            res.status(200);
            res.send(r);
        });
    });
}

// TODO: change so we don't delete entries on profiles_rosters on every update.
exports.update = (req, res) => {
    const data = req.body || {};

    let updateQuery = '';
    let updateFields = [];
    roster.allFields.forEach(field => {
        if (data[field]) {
            updateQuery += field + ' = ?, ';
            updateFields.push(data[field]);
        }
    })
    updateFields.push(parseInt(req.params.rosterId));


    const query = "UPDATE " + roster.table + " SET " + updateQuery.slice(0, -2) + " WHERE id=?";
    // makeQuery(res, query, updateFields);
    // const query = "INSERT INTO " + roster.table + " (" + roster.requiredFields.join(', ') + ") VALUES (" + roster.requiredFields.map(() => { return '?' }).join(', ') + ")";
    connection.query(query, updateFields, function (err, result) {
        if (err) {
            res.status(500);
            res.send({ status: 'error', message: 'db_error' })
            console.log(err)
        }


        const query1 = "DELETE FROM profiles_rosters WHERE roster_id = ?";
        connection.query(query1, parseInt(req.params.rosterId), function (err1, result1) {
            if (err1) {
                res.status(500);
                res.send({ status: 'error', message: 'db_error' })
                console.log(err)
            }

            const query2 = [];
            const data2 = [];

            req.body.profiles.forEach(function (profile) {
                query2.push("INSERT INTO profiles_rosters (profile_id, roster_id) VALUES (?, ?)");
                data2.push(profile);
                data2.push(parseInt(req.params.rosterId));
            })

            connection.query(query2.join('; '), data2, function (e, r) {
                if (err) {
                    res.status(500);
                    res.send({ status: 'error', message: 'db_error' })
                    console.log(e)
                }

                res.status(200);
                res.send(r);
            });
        });

    });
}

exports.delete = (req, res) => {
    const query = "DELETE FROM " + roster.table + " WHERE id=?";
    makeQuery(res, query, [parseInt(req.params.rosterId)]);
}

// TODO: join with profiles to grab users on the roster
exports.getCreatedRosters = (req, res) => {
    let selectFields = getFields(req, roster);
    const query = "SELECT " + selectFields.join(', ') + " FROM " + roster.table + " WHERE created_by=?";

    makeGetQuery(res, query, [parseInt(req.params.profileId)]);
}

// TODO: update fields returned to provide more information
exports.getAssignedRosters = (req, res) => {
    const query = "SELECT * FROM rosters INNER JOIN profiles_rosters ON rosters.id=profiles_rosters.roster_id WHERE profile_id = ?"

    makeGetQuery(res, query, [parseInt(req.params.profileId)]);
}