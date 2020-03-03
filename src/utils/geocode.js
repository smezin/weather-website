const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+ '.json?access_token=pk.eyJ1Ijoic21lemluIiwiYSI6ImNrNzIxYXBlbTA5M2UzaHAxczBzZmYyZHoifQ.Z-Son839AVa5Uij3cN03Wg&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to server', undefined);
        } else if (!body.features.length) {
            callback('Location not found', undefined);
        } else {
            callback(undefined, {
               latitude: body.features[0].center[1],
               longtitude: body.features[0].center[0],               
               location: body.features[0].place_name
            })
        }
    })  
} 

module.exports = geocode;