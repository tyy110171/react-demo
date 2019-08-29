import axios from 'axios';

export async function getMessage() {
    let resp;
    try {
        resp = await axios.get('/api/message');
        return {list: resp.data}
    } catch (e) {
        throw e;
    }
}
