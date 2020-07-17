import { Reducer, Effect, Subscription } from 'umi';
import * as apis from './service';

interface RealTimeModel {
    namespace: 'realtime';
    state: {};
    subscriptions: {
        setup: Subscription;
    };
    reducers: {
        getData: Reducer;
    };
    effects: {
        getList: Effect;
    };
}

const realtimeModel: RealTimeModel = {
    namespace: 'realtime',
    state: {
        name: '我补助到啊',
        dataSource: [],
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/') {
                    dispatch({ type: 'getList' });
                }
            });
        },
    },
    effects: {
        *getList(action, { call, put }) {
            const data = yield call(apis.getList);
            yield put({
                type: 'getData',
                payload: data,
            });
        },
    },
    reducers: {
        getData(state, { payload }) {
            const { data } = payload;
            return {
                ...state,
                dataSource: data,
            };
        },
    },
};

export default realtimeModel;
