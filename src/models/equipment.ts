import { Effect, Subscription, Reducer } from 'umi';
import { message } from 'antd';
import * as apis from './service';

export interface Istate {
    pageSize: number;
    page: number;
    data: any[];
}

interface EquipmentModels {
    namespace: 'equipment';
    state: Istate;
    subscriptions: {
        stup: Subscription;
    };
    effects: {
        addEquipment: Effect;
        getEquipmentList: Effect;
        delEquipment: Effect;
    };
    reducers: {
        getlist: Reducer;
    };
}

const equipment: EquipmentModels = {
    namespace: 'equipment',
    state: {
        pageSize: 10,
        page: 0,
        data: [],
    },
    subscriptions: {
        stup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/equipment') {
                    dispatch({ type: 'getEquipmentList' });
                }
            });
        },
    },
    effects: {
        *addEquipment({ payload }, { call }) {
            const data = yield call(apis.addEquipments, payload);
        },
        *getEquipmentList({ payload }, { call, put }) {
            const data = yield call(apis.getEquipmentList, {
                pageSize: 10,
                page: 0,
                sortOrder: 'DESC',
                sortProperty: 'createdTime',
                type: '',
                textSearch: payload,
            });
            yield put({ type: 'getlist', payload: data });
        },
        *delEquipment({ payload: id }, { call, put }) {
            const data = yield call(apis.delEquipment, id);
            message.success('成功删除');
            yield put({ type: 'getEquipmentList' });
        },
    },
    reducers: {
        getlist(state, { payload }) {
            const { data } = payload;
            return {
                ...state,
                data,
            };
        },
    },
};

export default equipment;
