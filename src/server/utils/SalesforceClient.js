// get salesforce auth token
// query salesforce data via SOQL
const axios = require('axios');
const qs = require('qs');

require("dotenv").config();

const {
    SF_TOKEN_URL,
    SF_CLIENT_ID,
    SF_CLIENT_SECRET,
    SF_USERNAME,
    SF_PASSWORD,
    SF_QUERY_URL
} = process.env;

const getSalesforceAuthToken = async () => {
    let response = null;
    try {
        const apiResponse = await axios.post(SF_TOKEN_URL, qs.stringify({
            'grant_type': 'password',
            'client_id': SF_CLIENT_ID,
            'client_secret': SF_CLIENT_SECRET,
            'username': SF_USERNAME,
            'password': SF_PASSWORD
        }));
        response = apiResponse.data.access_token;
    } catch (err) {
        console.error(err.message);
        throw new Error(err);
    }

    return response
};

const queryData = async ({ query, accessToken }) => {
    let response = null;

    const axiosParams = {
        method: 'get',
        url: `${SF_QUERY_URL}?q=${query}`,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };

    try {
        const apiResponse = await axios(axiosParams);

        response = apiResponse.data;
    } catch (err) {
        console.error(err.message);
        throw new Error(err);
    }

    return response
};

module.exports = { getSalesforceAuthToken, queryData }
