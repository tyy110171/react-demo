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

            const profileResp = await this.ctx.curl(
                `https://slack.com/api/users.profile.get?token=${token}&user=${mentionedId}`,
                {
                    method: 'GET',
                    dataType: 'json',
                }
            );
            const profile = profileResp.data.profile;

            profileImg32 = profile.image_32;
            displayName = profile.display_name_normalized;

            await this.ctx.curl(
                'https://slack.com/api/chat.postEphemeral',
                {
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        token,
                        channel: channel_id,
                        user: mentionedId,
                        text: 'Someone is mentioned you on APP praise',
                    },
                }
            );
        }

        ctx.body = {
            response_type: 'in_channel',
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `*${channel_id}*, Your praise is received!`,
                    },
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: displayName,
                    },
                    accessory: {
                        type: 'image',
                        image_url: profileImg32,
                        alt_text: 'avatar',
                    },
                },
            ],
        };
        ctx.set('Content-Type', 'application/json');
    }

    async message() {
        const token = process.env.SLACK_TOKEN;
        const channel = process.env.CHANNEL;

        const messageResp = await this.ctx.curl(
            `https://slack.com/api/im.history?token=${token}&channel=${channel}`,
            {
                method: 'GET',
                dataType: 'json',
            }
        );

        if (messageResp && messageResp.messages) {
            this.ctx.body = messageResp.messages.map(item => {
                return {
                    name: item.user,
                    message: item.text
                };
            });
        } else {
            this.ctx.body = [];
        }
    }
}

module.exports = HomeController;
