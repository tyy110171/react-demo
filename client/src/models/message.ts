import * as MessageService from "../service/message";

export default {
    namespace: 'messages',
    state: {
        list: []
    },
    reducers: {
        getMessages(state: any, action: any) {
            return { ...state, ...action.payload};
        },
    },
    effects: {
        *fetch(_, { call, put }) {
            const { list } = yield call(MessageService.getMessage);

            yield put({
                type: 'getMessages',
                payload: {
                    list
                },
            });
        },
    },
    subscriptions: {}
}
