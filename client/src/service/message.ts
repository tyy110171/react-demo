import request from '../utils/http';

export async function getMessage() {
    let resp;
    try {
        resp = await request({
            url: '/api/message',
            method: 'GET',
        });
        return {list: resp.data}
    } catch (e) {
        throw e;
    }
}
