const request = require('request');

const forecast = (lat, long, callback) => {
    const url='https://api.darksky.net/forecast/9b7ba6f24e86cad15769cd28b7a8fb7b/' + lat + ',' + long +'?units=si&lang=en';
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to server', undefined);
        } else if (body.error) {
            callback('Unable to process request', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + 
            ' degrees out. There is a ' + body.currently.precipProbability * 100 +'% chance of rain');
        }
    });
}

module.exports = forecast;