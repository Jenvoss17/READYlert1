const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const handlebars = require('express-handlebars')

require('dotenv').config();

const PORT = process.env.PORT || 8081;

const app = express()

// initialize middleware
app.use(compression())
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars({
    extname: 'handlebars',
    defaultView: 'default',
    layoutsDir: __dirname + '/views/pages/',
    partialsDir: __dirname + '/views/partials/'
}))

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);

    fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
        require('./routes/' + file)(app)
    })
});

module.exports = app