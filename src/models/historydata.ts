import { Effect, Subscription } from 'umi'
import * as apis from '@/models/service'
import { quotaName } from '@/assets/asssetsData'

interface Ihistory {
    namespace: 'history',
    state: {},
    subscriptions: {
        setup: Subscription
    },
    effects: {
        getHistoryData: Effect
    },
    reducers: {}
}

function joint(key?: string): string {
    const temp = Object.keys(quotaName).map((item) => {
        return item = `${key || 'm'}_${item}`
    })
    return temp.join()
}

console.log('object :>> ', joint());

const history: Ihistory = {
    namespace: 'history',
    state: {},
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/history') {
                    dispatch({ type: 'getHistoryData' })
                }
            })
        }
    },
    effects: {

        *getHistoryData({ payload: condition }, { call }) {
            const keys = condition ? joint(condition.keys) : joint()
            let timestamp = new Date().getTime()
            console.log('keys', keys)
            const data = yield call(apis.getHistoryData, { endTs: timestamp, keys: joint() })
        }
    },
    reducers: {}
}

export default history