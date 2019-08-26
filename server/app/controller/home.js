'use strict';
const { Controller } = require('egg');

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        await ctx.render("index");
    }
    async message() {
        await this.service.message;
        this.ctx.body = { message: 'uuuuuu' };
    }
}

module.exports = HomeController;
