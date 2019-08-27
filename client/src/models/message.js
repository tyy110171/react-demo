import {MessageService} from "../service/message";

export default {
    namespace: 'messages',
    state: {
        list: []
    },
    reducers: {
        getMessage(state, { payload: { data: list} }) {
            return { ...state, list };
        },
    },
    effects: {
        *fetch({ call, put }) {
            const { data } = yield call(MessageService.getMessage);
            yield put({
                type: 'getMessage',
                payload: {
                    data
                },
            });
        },
    }

}
