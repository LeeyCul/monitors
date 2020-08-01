import { Effect } from 'umi';
import { routerRedux } from 'dva/router';
import * as apis from './service';
import { message } from 'antd';

interface ILogin {
    namespace: 'login';
    state: {};
    subscriptions: {};
    effects: {
        loginIn: Effect;
    };
    reducers: {};
}

const loginModal: ILogin = {
    namespace: 'login',
    state: {},
    subscriptions: {},
    effects: {
        *loginIn({ payload: userInfo }, { call, put }) {
            const { super: auth, token, errmsg, errcode } = yield call(
                apis.login,
                userInfo,
            );
            if (errcode) {
                message.error(errmsg);
            }
            sessionStorage.setItem('token', token);
            if (token) {
                sessionStorage.setItem('user', userInfo.username);
                yield put(routerRedux.push('/'));
            }
        },
    },
    reducers: {},
};

export default loginModal;
