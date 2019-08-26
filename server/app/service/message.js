"use strict";
const { Service } = require('egg');

class MessageService extends Service {
    async message() {
        const { ctx } = this;
        return await ctx.curl('https://appen-praise.herokuapp.com/slack/message', {
            method: 'GET',
            contentType: 'json'
        });
    }
}
module.exports = MessageService;
