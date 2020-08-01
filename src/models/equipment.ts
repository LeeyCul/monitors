import { Effect, Subscription, Reducer } from 'umi';
import { message, Modal } from 'antd';
import { history } from 'umi';
import * as apis from './service';

function countDown() {
    let secondsToGo = 3;
    const modal = Modal.success({
        title: '提示',
        content: `编辑已完成，将在${secondsToGo} 秒后跳转到列表页`,
    });
    const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
            content: `编辑已完成，将在${secondsToGo} 秒后跳转到列表页`,
        });
    }, 1000);
    setTimeout(() => {
        clearInterval(timer);
        history.push('/equipment');
        modal.destroy();
    }, secondsToGo * 1000);
}

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
        *addEquipment({ payload }, { call, put }) {
            const { type, value } = payload;
            const data = yield call(apis.addEquipments, value);
            const { id } = data;
            if (id) {
                if (type) {
                    message.success('新增成功');
                } else {
                    // message.success('编辑成功');
                    // yield put(routerRedux.push('/equipment'));
                    countDown();
                }
            }
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
