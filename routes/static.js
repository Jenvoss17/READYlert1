const Static = require('../controllers/static')

module.exports = api => {
    api.route(`/`).get(Static.home)
};