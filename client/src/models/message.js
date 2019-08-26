import {MessageService} from "../service/message";

export default {
    namespace: 'messages',
    state: {
        list: [

            {
                massage: '11'
            }
        ]
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
                type: 'save',
                payload: {
                    data
                },
            });
        },
    }

}
