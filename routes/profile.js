const Profile = require('../controllers/profile')
const apiPrefix = '/api/v1'

module.exports = api => {
    api.route(`${apiPrefix}/profiles`).get(Profile.list)
    api.route(`${apiPrefix}/profiles`).post(Profile.create)
    api.route(`${apiPrefix}/profiles/:profileId`).get(Profile.get)
    api.route(`${apiPrefix}/profiles/:profileId`).put(Profile.update)
    api.route(`${apiPrefix}/profiles/:profileId`).delete(Profile.delete)
};