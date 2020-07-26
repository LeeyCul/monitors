import { Reducer, Effect, Subscription } from 'umi';
import * as apis from './service';
import { listenWebSocket } from './websocket';

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
            // const data = yield call(listenWebSocket);
            // console.log('datas222', data);
        },
    },
    reducers: {
        getData(state, { payload }) {},
    },
};

export default realtimeModel;
