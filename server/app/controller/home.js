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
        const token = process.env.SLACK_TOKEN;
        const { ctx } = this;
        const { text, user_name, channel_id } = ctx.request.body;
        const mentionMatch = (text || '').match(userIdReg);
        let profileImg32 = '';
        let displayName = '';

        if (mentionMatch) {
            const [ mentionMessage, mentionText ] = mentionMatch;
            const [ mentionedId ] = mentionText.split('|');

            const message = text.replace(mentionMessage, '');

            if (messages) {
                messages.push({
                    message,
                    name: user_name + mentionedId,
                    channel: channel_id
                });
            } else {
                messages = [{
                    message,
                    name: user_name,
                    channel: channel_id
                }];
            }

            await this.ctx.curl(
                `https://slack.com/api/users.profile.get?token=${token}&user=${mentionedId}`,
                {
                    method: 'GET',
                    dataType: 'json',
                }
            );
            // const profile = profileResp.data.profile;
            //
            // profileImg32 = profile.image_32;
            // displayName = profile.display_name_normalized;

            // await this.ctx.curl(
            //     'https://slack.com/api/chat.postEphemeral',
            //     {
            //         method: 'POST',
            //         dataType: 'json',
            //         data: {
            //             token,
            //             channel: channel_id,
            //             user: mentionedId,
            //             text: 'Someone is mentioned you on APP praise',
            //         },
            //     }
            // );
        }

        // ctx.body = {
        //     response_type: 'in_channel',
        //     blocks: [
        //         {
        //             type: 'section',
        //             text: {
        //                 type: 'mrkdwn',
        //                 text: `*${user_name}*, Your praise is received!`,
        //             },
        //         },
        //         {
        //             type: 'section',
        //             text: {
        //                 type: 'mrkdwn',
        //                 text: displayName,
        //             },
        //             accessory: {
        //                 type: 'image',
        //                 image_url: profileImg32,
        //                 alt_text: 'avatar',
        //             },
        //         },
        //     ],
        // };
        // ctx.set('Content-Type', 'application/json');
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
