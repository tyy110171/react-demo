'use strict';

module.exports = {
    get messages() {
        return this.session ? this.session.message : null;
    }
};
