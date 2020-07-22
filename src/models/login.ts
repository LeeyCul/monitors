import { Effect, } from 'umi'
import { routerRedux } from 'dva/router'
import * as apis from './service';

interface ILogin {
    namespace: 'login'
    state: {}
    subscriptions: {}
    effects: {
        loginIn: Effect
    },
    reducers: {}
}

const loginModal: ILogin = {
    namespace: 'login',
    state: {},
    subscriptions: {},
    effects: {
        * loginIn({ payload: userInfo }, { call, put }) {
            const data = yield call(apis.login, userInfo)
            const token = data && data.token
            localStorage.setItem('token', token)
            if (token) {
                yield put(routerRedux.push('/'))
            }
        }
    },
    reducers: {},

}

export default loginModal;