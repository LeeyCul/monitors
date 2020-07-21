import { extend } from 'umi-request';
import { message } from "antd";

const errorHandler = function (error: any) {
    if (error.response) {
        if (error.response.status > 400) {
            message.error(error.data.message ? error.data.message : error.data);
        }
    } else {
        message.error('Network Error.');
    }

    throw error;
};

const request = extend({
    errorHandler
})

request.interceptors.request.use((url, options) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Authorization': 'jrHhMzCT9h3m94m2MTDN'
    }
    return (
        {
            url,
            options: {
                ...options,
                headers
            },
        }
    );
});

// response拦截器, 处理response
request.interceptors.response.use(async (response) => {
    return response
});

export async function getList() {
    return request('http://hwy.feelbang.com:8080/api/admin/securitySettings', {
        method: 'get',
    })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log('err', err);
        });
}
