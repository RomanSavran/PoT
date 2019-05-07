import axios from 'axios';

const getDevURL = (path) => {
    //if( process.env.NODE_ENV == 'production' ) return path;

    if( path.indexOf('project/GetProjectsByOwnerName') >= 0 ) {
        return 'data/GET/projects.json';
    }
};

export const GET = async (path) => {
    let base = process.env.NODE_ENV == 'production'
        ? 'https://kallio.dev.uds.systems/'
        : 'http://localhost:7777/';

    const url = getDevURL(path);
    
    return new Promise((resolve, reject) => {
        axios.get(url, {
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

export const REQ = async (rs) => {
    //rs - request settings
    const {data = null} = rs;
    
    const base = process.env.NODE_ENV == 'production'
        ? 'https://kallio.dev.uds.systems/'
        : 'http://localhost:7777/';
    const url = process.env.NODE_ENV == 'production' 
        ? rs.url 
        : getDevURL(rs.url);
    
    const method = process.env.NODE_ENV !== 'production' && rs.method == 'post' 
        ? 'get'
        : rs.method;

    return await new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            data: data,
            baseURL: base
        })
            .then((res) => {resolve(res)})
            .catch((err) => {reject(err)});
    });
};
