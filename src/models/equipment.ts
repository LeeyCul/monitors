import { Effect } from 'umi';
import * as apis from './service';

interface EquipmentModels {
    namespace: 'equipment';
    state: {};
    subscriptions: {};
    effects: {
        addEquipment: Effect;
    };
    reducers: {};
}

const equipment: EquipmentModels = {
    namespace: 'equipment',
    state: {},
    subscriptions: {},
    effects: {
        *addEquipment({ payload }, { call }) {
            const data = yield call(apis.addEquipment, payload);
        },
    },
    reducers: {},
};

export default equipment;
