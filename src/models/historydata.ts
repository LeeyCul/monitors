import { Effect, Subscription, Reducer } from 'umi';
import * as apis from '@/models/service';
import { quotaName } from '@/assets/asssetsData';

interface Ihistory {
    namespace: 'historyData';
    state: {
        list: any;
    };
    subscriptions: {
        setup: Subscription;
    };
    effects: {
        getHistoryData: Effect;
    };
    reducers: {
        getHistoryList: Reducer;
    };
}

function joint(key?: string): string {
    const temp = Object.keys(quotaName).map(item => {
        return (item = `${key || 'm'}_${item}`);
    });
    return temp.join();
}

const history: Ihistory = {
    namespace: 'historyData',
    state: {
        list: {},
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/history') {
                    dispatch({ type: 'equipment/getEquipmentList' });
                }
            });
        },
    },
    effects: {
        *getHistoryData({ payload }, { call, put }) {
            const { condition, id } = payload;
            const keys = condition ? joint(condition.keys) : joint();
            let endTs = new Date().getTime();
            //默认显示最近30分钟数据
            let startTs = endTs - 30 * 60 * 1000;
            let resultObj = {};
            if (condition) {
                resultObj = Object.assign({}, condition, { keys });
            } else {
                resultObj = { startTs, endTs, keys: keys };
            }
            const data = yield call(apis.getHistoryData, {
                value: resultObj,
                id,
            });
            yield put({ type: 'getHistoryList', payload: data });
        },
    },
    reducers: {
        getHistoryList(state, { payload: list }) {
            let objData = {};
            const ts = Object.keys(list)[0];
            for (let key in list) {
                let newkey = key && key.split('_')[1];
                Object.assign(objData, {
                    [newkey]: list[key],
                    ts: list[ts],
                });
            }
            return {
                ...state,
                list: objData,
            };
        },
    },
};

export default history;
