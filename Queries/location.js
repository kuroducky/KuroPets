
const request = require('request');

const vetUrl = 'https://data.gov.sg/api/action/datastore_search?resource_id=b2871270-4eef-44a3-be98-908e2a73b19f&limit=5';
const parkUrl = 'https://data.gov.sg/dataset/mp14-sdcp-pw-plan-parks-and-open-space/resource/dab8dd78-7273-490f-98f7-890b7a2055d6/view/51297087-f4ac-432f-8291-543931b82300';

const getVets = (req, res) => {
    request(vetUrl, function (error, response, body) {
        if (error) {
            throw error;
        }
        const records = JSON.parse(body).result.records;
        res.status(200).json(records);
    });
}

const getParks = (req, res) => {
    request(parkUrl, function (error, response, body) {
        if (error) {
            throw error;
        }
        res.status(200).send(body);
    });
}

module.exports = {
    getVets,
    getParks
};
