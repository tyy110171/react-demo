// import fetch from 'dva/fetch';
import request from '../utils/request';

export class MessageService {
    static getMessage() {
        // let response;
        // let data;
        // try {
        //     response = await fetch('/api/message');
        //     data = await response.json();
        //
        // } catch (e) {
        //     throw new Error('Api error');
        // }
        // console.log(response);
        // console.log(data);

        return request('/api/message');
    }
}
