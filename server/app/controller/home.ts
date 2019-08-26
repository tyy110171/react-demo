import { Controller } from 'egg';

export default class HomeController extends Controller {
    public async index() {
        const { ctx } = this;
        await ctx.render("index");
    }

    public async message() {
        await this.service.message;
        this.ctx.body = {message: 'uuuuuu'};
    }
}
