//封装请求
import 'whatwg-fetch'

let query = {
    '_': new Date().getTime(),
    'X-FOR-WITH': 'E%2Fc2Z8Oo8O2n4yAYL7CJjiYkEaODEN0Vf%2F9jFZib3okrFYaHbAudaWVNad367h9132XfjtsctRWzDpKr%2B2RrVuuLD1wOSBwtPF%2BG0bBQe7TLr6hESgr0YXG%2BWFGEQB%2BiBObv4GYT3fdwcIx3eN1eMQ%3D%3D'
}

//将参数对象转字符串
function formatParam(param){
    if(!param){
        return '';
    }
    let paramStr = '';
    Object.entries(param).forEach(([key, value], index)=>{
        paramStr += `${key}=${value}`;
        if(index < Object.keys(param).length-1){
            paramStr += '&';
        }
    })
    return paramStr;
}

function get(url, param){
    return new Promise((resolve, reject)=>{
        let obj = {...query};
        if(param){
            obj = {...obj, ...param}
        }
        let paramStr = formatParam(obj);
        fetch(url+'?'+paramStr, {
            method: 'GET'
        })
        .then(response=>{
            if(response.status === 200){
                return response.json();
            }else{
                reject(response);
            }
        })
        .then(data=>{
            resolve(data);
        })
        .catch(error=>{
            reject(error);
        })
    })
}

function post(url, body, param){
    return new Promise((resolve, reject)=>{
        let obj = {...query};
        if(param){
            obj = {...obj, ...param};
        }
        let paramStr = formatParam(obj);

        let bodyStr = formatParam(body);

        fetch(url+'?'+paramStr, {
            method: 'POST',
            body: bodyStr,
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
                'Accept': 'application/json'
            })
        })
        .then(response=>{
            if(response.status === 200){
                return response.json();
            }else{
                reject(response);
            }
        })
        .then(data=>{
            resolve(data);
        })
        .catch(error=>{
            reject(error);
        })
    })
}

export default {
    get,
    post
}
