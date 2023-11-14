import axios from 'axios';
import { Alert } from 'react-native';
import { baseApiUrl, dvCommand, urlService, urlServiceFile } from '../../util';

const adminSess = "65178215-7896-4513-8e26-896df9cb36ad"

export async function runApiList(sessionId, url) {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseApiUrl + url,
            headers: { 
                'Authorization': 'Bearer ' + sessionId
            }
        };
        const response = await axios.request(config);
        var result = [{"offset": "1", "pagesize": (response.data.data).length, "totalcount": (response.data.data).length, "result" : response.data.data}];
        return result[0];
    } catch (err) {
        console.log(err);
        console.log("ERROR: 11 ");
    }
};

export async function runApiData(sessionId, jobId) {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseApiUrl + 'api/job/' + jobId,
            headers: { 
                'Authorization': 'Bearer ' + sessionId
            }
        };
        const response = await axios.request(config);
        var result = response?.data.data ? response.data.data : [];
        return result;
    } catch (err) {
        console.log(err);
        console.log("ERROR: 11 ");
    }
};

export async function runApiGetData(url, sessionId, jobId) {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseApiUrl + url + jobId,
            headers: { 
                'Authorization': 'Bearer ' + sessionId,
                'X-Atlassian-Token': 'nocheck',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };
        
        console.log(baseApiUrl + url + jobId);
        const response =  await axios.request(config);
        var result = response?.data ? response.data : [];
        return result;
    } catch (err) {
        console.log('eee', err);
        return false;
    }
};

export async function runApiPostData(url, sessionId, data) {
        
    console.log(baseApiUrl + url);
    try {
        const response = await axios.post(
            baseApiUrl + url,
            data,
            {
                headers: { 
                    'Authorization': 'Bearer ' + sessionId,
                }
            }
        );

        return response?.data;
    } catch (err) {
        console.log('eee', err);
        return false;
    }
};

export async function runService(command, parameters, sessionId, jsonFormat) {
    return false;
};










