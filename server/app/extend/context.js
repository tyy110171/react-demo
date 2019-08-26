'use strict';

module.exports = {
    get messages() {
        return this.session ? this.session.message : null;
    },

    set messages(val) {
        if (this.session) {
            if (this.session.message) {
                this.session.message.push({message: val});
            } else {
                this.session.message = [{message: val}];
            }
        }

        return null;
    }
};
