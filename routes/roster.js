const Roster = require('../controllers/roster')
const apiPrefix = '/api/v1'

module.exports = api => {
    api.route(`${apiPrefix}/rosters`).get(Roster.list)
    api.route(`${apiPrefix}/rosters`).post(Roster.create)
    api.route(`${apiPrefix}/rosters/:rosterId`).get(Roster.get)
    api.route(`${apiPrefix}/rosters/:rosterId`).put(Roster.update)
    api.route(`${apiPrefix}/rosters/:rosterId`).delete(Roster.delete)

    api.route(`${apiPrefix}/rosters/creator/:profileId`).get(Roster.getCreatedRosters)
    api.route(`${apiPrefix}/rosters/assigned/:profileId`).get(Roster.getAssignedRosters)
};