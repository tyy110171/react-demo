'use strict';
const { Controller } = require('egg');
const userIdReg = /<@(.+)>/;

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
            const [ , mentionText ] = mentionMatch;
            const [ mentionedId ] = mentionText.split('|');
            const profileResp = await this.ctx.curl(
                `https://slack.com/api/users.profile.get?token=${token}&user=${mentionedId}`,
                {
                    method: 'GET',
                    dataType: 'json',
                }
            );

            this.ctx.messages = text;
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
                        text: `*${user_name}*, Your praise is received!`,
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
        this.ctx.body = this.ctx.messages;
        this.ctx.status = 200;
    }
}

module.exports = HomeController;
