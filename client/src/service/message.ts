import fetch from 'dva/fetch';

export class MessageService {
    static async getMessage() {
        let response;

        try {
            response = await fetch('/slack/message');
        } catch (e) {
            throw new Error('Api error');
        }
        console.log(response)

        return response.body;
    }
}
