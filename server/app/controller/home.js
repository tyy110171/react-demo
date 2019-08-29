'use strict';
const { Controller } = require('egg');
const userIdReg = /<@(.+)>/;
let messages;
class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        await ctx.render("index");
    }

    async slackMessage() {
        // const token = process.env.SLACK_TOKEN;
        const { ctx } = this;
        const { text, user_name, channel_id } = ctx.request.body;
        const mentionMatch = (text || '').match(userIdReg);
        // let profileImg32 = '';
        // let displayName = '';

        if (mentionMatch) {
            const [ mentionMessage, ] = mentionMatch;
            // const [ mentionedId ] = mentionText.split('|');

            const message = text.replace(mentionMessage, '');

            if (messages) {
                messages.push({
                    message,
                    name: user_name,
                    channel: channel_id
                });
            } else {
                messages = [{
                    message,
                    name: user_name,
                    channel: channel_id
                }];
            }
        }
    }

    async message() {
        console.log(messages)
        if (messages) {
            this.ctx.body = messages;
        } else {
            this.ctx.body = [];
        }

        // this.ctx.status = 200;
    }
}

module.exports = HomeController;
