
const request = require('request');

const govDataApi = 'https://data.gov.sg/api/action/datastore_search';
const vetResourceId = 'b2871270-4eef-44a3-be98-908e2a73b19f';
const parkResourceId = '';

const getVets = (req, res) => {
    request(`${govDataApi}?resource_id=${vetResourceId}&limit=5`, function (error, response, body) {
        if (error) {
            throw error;
        }
        res.status(200).json(body);
    });
}

const getParks = (req, res) => {
    request(`${govDataApi}?resource_id=${vetResourceId}&limit=5`, function (error, response, body) {
        if (error) {
            throw error;
        }
        res.status(200).json(body);
    });
}

/*
app.get('/api/location/vet', db.getVets)
app.get('/api/location/park', db.getParks)
*/

module.exports = {
    getVets
};
