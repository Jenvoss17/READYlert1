const { makeGetQuery, makeQuery, getFields } = require('../mixins');
const Profile = require('../models/profile');

const profile = new Profile();

exports.list = (req, res) => {
    let selectFields = getFields(req, profile);
    const query = "SELECT " + selectFields.join(', ') + " FROM " + profile.table;

    makeGetQuery(res, query);
}

exports.get = (req, res) => {
    let selectFields = getFields(req, profile);
    const query = "SELECT " + selectFields.join(', ') + " FROM " + profile.table + " WHERE id=?";

    makeGetQuery(res, query, [parseInt(req.params.profileId)]);
}

exports.create = (req, res) => {
    const data = req.body || {};

    const requiredData = {};
    profile.requiredFields.forEach(field => {
        requiredData[field] = data[field];
    })

    const query = "INSERT INTO " + profile.table + " (" + profile.requiredFields.join(', ') + ") VALUES (" + profile.requiredFields.map(() => { return '?' }).join(', ') + ")";
    makeQuery(res, query, Object.values(requiredData));
}

exports.update = (req, res) => {
    const data = req.body || {};

    let updateQuery = '';
    let updateFields = [];
    profile.allFields.forEach(field => {
        if (data[field]) {
            updateQuery += field + ' = ?, ';
            updateFields.push(data[field]);
        }
    })
    updateFields.push(parseInt(req.params.profileId));


    const query = "UPDATE " + profile.table + " SET " + updateQuery.slice(0, -2) + " WHERE id = ?";
    makeQuery(res, query, updateFields);
}

exports.delete = (req, res) => {
    const query = "DELETE FROM " + profile.table + " WHERE id=?";
    makeQuery(res, query, [parseInt(req.params.profileId)]);
}