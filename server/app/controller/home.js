'use strict';
const { Controller } = require('egg');

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        await ctx.render("index");
    }

    async slackMessage() {
        const param = this.ctx.request.body;
        this.ctx.messages = param;
    }

    async message() {
        this.ctx.body = this.ctx.messages;
    }
}

module.exports = HomeController;
