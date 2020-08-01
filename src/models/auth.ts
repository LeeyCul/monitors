import { Effect, Reducer, Subscription } from 'umi';
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

interface AuthModels {
    data: Data;
    resourceList: any[];
    roleCheckList: any[];
}

interface AuthModles {
    namespace: 'auth';
    state: AuthModels;
    subscriptions: {
        setup: Subscription;
    };
    effects: {
        getRoleList: Effect;
        addRole: Effect;
        delRole: Effect;
        updateRole: Effect;
    };
    reducers: {
        setRoleList: Reducer;
        setResourceList: Reducer;
        setRoleCheckList: Reducer;
    };
}

const auth: AuthModles = {
    namespace: 'auth',
    state: {
        data: {},
        resourceList: [],
        roleCheckList: [],
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/auth') {
                    dispatch({ type: 'getRoleList' });
                }
            });
        },
    },
    effects: {
        *getRoleList({}, { call, put, all }) {
            const { RoleList, ResourceList } = yield all({
                RoleList: yield call(apis.getRoleList),
                ResourceList: yield call(apis.getResourceList),
            });
            yield put({ type: 'setRoleList', payload: RoleList });
            yield put({ type: 'setResourceList', payload: ResourceList });
        },
        *addRole({ payload: value }, { call, put }) {
            const data = yield call(apis.addRole, value);
            console.log('status', data);
            if (!status) {
                message.success('新增成功');
                yield put({ type: 'getRoleList' });
            }
        },
        *delRole({ payload: id }, { call, put }) {
            const { msg } = yield call(apis.delRole, id);
            if (msg) {
                message.success('成功删除');
                yield put({ type: 'getRoleList' });
            }
        },
        *updateRole({ payload: value }, { call, put }) {
            const { status } = yield call(apis.updateRole, value);
            if (!status) {
                message.success('更新成功');
                yield put({ type: 'getRoleList' });
            }
        },
    },
    reducers: {
        setRoleList(state, { payload: data }) {
            return {
                ...state,
                data,
            };
        },
        setResourceList(state, { payload: data }) {
            return {
                ...state,
                resourceList: data,
            };
        },
        setRoleCheckList(state, { payload }) {
            return {
                ...state,
                roleCheckList: payload,
            };
        },
    },
};

export default auth;
