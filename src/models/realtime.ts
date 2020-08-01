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
        name: '',
        dataSource: [],
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/') {
                    dispatch({ type: 'equipment/getEquipmentList' });
                }
            });
        },
    },
    effects: {
        *getList(action, { call, put }) {
            // const data = yield call(listenWebSocket);
        },
    },
    reducers: {
        getData(state, { payload }) {},
    },
};

export default realtimeModel;
