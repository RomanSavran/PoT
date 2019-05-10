import axios from 'axios';

export const GET = async (path) => {
    let base = process.env.NODE_ENV == 'production'
        ? 'https://raw.githubusercontent.com/RomanSavran/PoT/master/'
        : 'https://raw.githubusercontent.com/RomanSavran/PoT/master/';
    
    return new Promise((resolve, reject) => {
        axios.get('contexts/contexts.jsonld', {
            baseURL: base
        })
            .then((res) => {resolve(res)})
            .catch((err) => {reject(err)});
    });
};
export const POST = async (path, data) => {
    let base = process.env.NODE_ENV == 'production'
        ? 'https://kallio.dev.uds.systems/'
        : 'http://localhost:7777/';

    const url = getDevURL(path);
    
    return new Promise((resolve, reject) => {
        axios({
            method: process.env.NODE_ENV == 'production' ? 'post' : 'get',
            url: url,
            data: data,
            baseURL: base
        })
            .then((res) => {resolve(res)})
            .catch((err) => {reject(err)});
    });
};

export const FETCH = async (rs) => {
    //rs - request settings
    let {data = null, url, method} = rs;
    
    const base = process.env.NODE_ENV == 'production'
        ? 'https://raw.githubusercontent.com/RomanSavran/PoT/master/'
        : 'https://raw.githubusercontent.com/RomanSavran/PoT/master/';

    return await new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            data: data,
            baseURL: base
        })
            .then((res) => {resolve({res: res, rs: rs})})
            .catch((err) => {reject(err)});
    });
};
