const MESSAGE = Symbol("Application#messages");

module.exports = {

    get messages() {
        return this[MESSAGE];
    },

    set messages(val) {
        let sessionMessage = this[MESSAGE];
        if (sessionMessage) {
            sessionMessage.push({message: text});
            this[MESSAGE] = sessionMessage;
        } else {
            this[MESSAGE] = [{message: val}];
        }
    }
};
