import { Reducer, Effect, Subscription } from 'umi';
import * as apis from './service';
import { message } from 'antd';

interface Pager<T> {
    page: T;
    size: T;
    totalPage: T;
    totalSize: T;
}

export interface Data {
    list?: any[] | null | undefined;
    pager?: Pager<number> | null | undefined;
}

export interface UserState {
    data: Data;
    roleList: any[];
}

interface UserModels {
    namespace: 'user';
    state: UserState;
    subscriptions: {
        setup: Subscription;
    };
    effects: {
        getUserList: Effect;
        addUser: Effect;
        delUser: Effect;
        getRoleList: Effect;
        updateUser: Effect;
    };
    reducers: {
        setUserList: Reducer;
        setRoleList: Reducer;
    };
}

const user: UserModels = {
    namespace: 'user',
    state: {
        data: {},
        roleList: [],
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/personnel') {
                    dispatch({ type: 'getUserList' });
                    dispatch({ type: 'getRoleList' });
                }
            });
        },
    },
    effects: {
        *getUserList({ payload }, { call, put }) {
            const list = yield call(apis.getUserList);
            yield put({ type: 'setUserList', payload: list });
        },
        *addUser({ payload: info }, { call, put }) {
            const data = yield call(apis.addUser, info);
            const { status } = data;
            if (!status) {
                message.success('新增成功');
                yield put({ type: 'getUserList' });
            }
        },
        *delUser({ payload: id }, { call, put }) {
            const data = yield call(apis.delUser, id);
            const { status } = data;
            if (!status) {
                message.success('成功删除');
                yield put({ type: 'getUserList' });
            }
        },
        *getRoleList({}, { call, put }) {
            const data = yield call(apis.getRoleList);
            const { list } = data;
            yield put({ type: 'setRoleList', payload: list });
        },
        *updateUser({ payload: info }, { call, put }) {
            const { status } = yield call(apis.updateUser, info);
            if (!status) {
                message.success('修改成功');
                yield put({ type: 'getUserList' });
            }
        },
    },
    reducers: {
        setUserList(state, { payload }) {
            return {
                ...state,
                data: payload,
            };
        },
        setRoleList(state, { payload }) {
            return {
                ...state,
                roleList: payload,
            };
        },
    },
};

export default user;
