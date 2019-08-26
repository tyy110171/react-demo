import { Service } from 'egg';

export class MessageService extends Service {
    public async message() {
        const { ctx } = this;
        return await ctx.curl('https://appen-praise.herokuapp.com/slack/message', {
            method: 'GET',
            contentType: 'json'
        });
    }
}
