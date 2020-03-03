const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000; //if process exists (on heroku) then first value, otherwise 3000



//costumizing the default paths for Express config and "views" directory 
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars (hbs) engine and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

//rendering requeset, supporting dynamic by sending object
app.get('', (req, res) => {
    res.render('index', {
        title: 'My Weather site',
        name: 'Shahaf',
        copyrights: 'Shahaf mezin'
    })
})
app.get('/about', (req, res) => {
    res.render ('about', {
        title: 'About page',
        about: 'This is a weather forecast site',
        copyrights: 'Shahaf mezin'
    })
})

app.get('/help', (req, res) => {
    res.render ('help', {
        title: 'Help page',
        getHelp: 'Help is not available in this country',
        copyrights: 'Shahaf mezin'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({error: 'address error'});
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.sendStatus({error: 'forecast error'});
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })  
})

app.get('/products', (req, res) => {
    console.log(req.query);
    res.send ({
        products: []
    })
})

//handing '/help/' sub pages search 
app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: '404',
        error: 'Help article not found',
        copyrights: 'Shahaf mezin'
    })
})
//if no match foud, '*' means everything is a match and sends 404 message
app.get('*', (req, res) => {
    res.render ('notFound', {
        title: '404',
        error: 'Page not found!',
        copyrights: 'Shahaf mezin'
    })
})

//listening on port 3000
app.listen(port, () => {
    console.log('server is up on port ' + port);
});