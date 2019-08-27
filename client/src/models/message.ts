import * as MessageService from "../service/message";

export default {
    namespace: 'messages',
    state: {
        list: []
    },
    reducers: {
        messages(state, { payload: { data: list} }) {
            console.log(2)

            return { ...state, list };
        },
    },
    effects: {
        *fetch({ call, put }) {
            const { data } = yield call(MessageService.getMessage);
            yield put({
                type: 'messages/messages',
                payload: {
                    data: []
                },
            });
        },
    }

}
