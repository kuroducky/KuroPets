const request = require('request');

const vetUrl = 'https://data.gov.sg/api/action/datastore_search?resource_id=b2871270-4eef-44a3-be98-908e2a73b19f&limit=5';

/**
 * Gets a list of all the vets from data.gov.sg
 * @param {JSON} req 
 * @param {JSON} res 
 */
const getVets = (req, res) => {
    request(vetUrl, function (error, response, body) {
        if (error) {
            throw error;
        }
        const records = JSON.parse(body).result.records;
        res.status(418).json(records);
    });
}

/**
 * Gets an iframe of the parks from data.gov.sg
 * @param {JSON} req 
 * @param {JSON} res 
 */
const getParks = (req, res) => {
    const iframe = '<iframe width="600" height="400" src="https://data.gov.sg/dataset/mp14-sdcp-pw-plan-parks-and-open-space/resource/dab8dd78-7273-490f-98f7-890b7a2055d6/view/51297087-f4ac-432f-8291-543931b82300" frameBorder="0" />'
    res.status(418).send(iframe)
}

module.exports = {
    getVets,
    getParks
};
