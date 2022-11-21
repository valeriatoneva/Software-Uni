import { clearUserData, getAcessToken } from "../util.js";

const host = 'http://localhost:3030'

async function request(method, url, data){
    const options = {
        method,
        headers: {}
    }

    const token = getAcessToken();
    if(token){
        options.header('X-Authorization') = token;
    }

    if(data) {
        options.headers('Content-Type') = 'application/json';
        options.body = JSON.stringify(data)
    }

    try {
        let response = await fetch(host + url, options);
        if(response.ok != true){
            if(response.status == 403){
                clearUserData()
            }
            let error = await response.json();
            throw new Error(error.message)
        }

        if(response.status == 204){
            return response;
        } else {
            response.json()
        }
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');


