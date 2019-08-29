'use strict';

module.exports = {
    get messages() {
        console.log(this['session'])
        return this.session ? this.session.message : null;
    }
};
