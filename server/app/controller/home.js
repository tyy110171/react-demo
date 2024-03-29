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
        // const app = process.env.APP;
        const { ctx } = this;
        const { text, user_name, channel_id } = ctx.request.body;

        const mentionMatch = (text || '').match(userIdReg);
        let profileImg32 = '';
        let displayName = '';

        if (mentionMatch) {
            const [ , mentionText ] = mentionMatch;
            const [ mentionedId ] = mentionText.split('|');

            ctx.logger.info('mentionedId %s; token %s; user_name %s; channel_id %s', mentionedId, token, user_name, channel_id);
            try {
               const profileResp = await this.ctx.curl(
                   `https://slack.com/api/users.profile.get?token=${token}&user=${mentionedId}`,
                   {
                       method: 'GET',
                       dataType: 'json',
                   }
               );

                ctx.logger.info('profileResp %j', profileResp);


                const profile = profileResp.data.profile;

                profileImg32 = profile.image_32;
                displayName = profile.display_name_normalized;


                const resp = await this.ctx.curl(
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

                ctx.logger.info('resp %j', resp);
            } catch (e) {
                ctx.logger.error('error %j', e);
            }
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
        const token = process.env.SLACK_TOKEN;
        const channel = process.env.CHANNEL;

        try {
            const messageResp = await this.ctx.curl(
                `https://slack.com/api/im.history?token=${token}&channel=${channel}`,
                {
                    method: 'GET',
                    dataType: 'json',
                }
            );

            if (messageResp && messageResp.data && messageResp.data.messages) {
                const messages = [];
                messageResp.data.messages.forEach(item => {
                    if (item.text) {
                        const mentionMatch = (item.text || '').match(userIdReg);
                        if (mentionMatch) {
                            const [ mentionMessage, mentionText] = mentionMatch;
                            const [ , userName ] = mentionText.split('|');

                            const message = item.text.replace(mentionMessage, '');
                            messages.push({
                                name: userName,
                                message: message
                            });
                        }
                    }
                });

                this.ctx.body = messages;
            } else {
                this.ctx.body = [];
            }
        } catch (e) {
            if (e.error) {
                this.ctx.body = {error: e.error};
            } else {
                this.ctx.logger.error('error %j', e);
            }
        }
    }
}

module.exports = HomeController;
