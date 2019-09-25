const fs = require('fs')

exports.home = (req, res) => {
    res.render('home', { layout: 'default', template: 'home-template' });
};