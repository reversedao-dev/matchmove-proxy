const express = require('express')
const app = express()
const port = 3000

const MATCHMOVE_USERNAME = process.env.MATCHMOVE_USERNAME
const MATCHMOVE_PASSWORD = process.env.MATCHMOVE_PASSWORD
const MM_BASE_URL = process.env.MM_BASE_URL

app.get('/connection', (req, res) => {
  res.send('server connected!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

'use strict'

const axios = require('axios');

const setAxiosConfig = (url='', method='get') => {
    let config = {}; 
    config.baseURL = MM_BASE_URL;
    config.auth = {
        username: MATCHMOVE_USERNAME,
        password: MATCHMOVE_PASSWORD,
    };
    config.method = 'get';
    config.url = url;
    return config
}

exports.handler = async (event) => {
    
    let mmBaseUrl = MM_BASE_URL;
    let requestUrl;
    let body = { "requestUrl": '/user'};

    console.log(event.queryStringParameters);
    
    if (event.queryStringParameters?.requestUrl) {
        requestUrl = event.queryStringParameters.requestUrl;
    }
    // else if (event.requestUrl) {
    //     requestUrl = event.requestUrl;
    // }
    
    let axiosConfig = setAxiosConfig(requestUrl);
    
    let resp = await axios(axiosConfig).then((data) => {
        console.log("is success", data);
        return data;
    }).catch((error) => {
        console.log('Error in fetching axios', error);
        return error;
    })
                        
    body.requestUrl = `${mmBaseUrl}${requestUrl}`
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(body),
    };
    return response;
};
