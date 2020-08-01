import request from '@/utils/request';

/**
 * login
 */
export async function login(params: any) {
    return request(`/openapi/v1/user/login`, {
        method: 'POST',
        data: params,
    });
}

/**
 * 新增设备
 */
export async function addEquipments(params: any) {
    return request(`/api/device`, {
        method: 'POST',
        data: params,
    });
}

/**
 * 设备列表
 */

export async function getEquipmentList(params: any) {
    return request(`/api/tenant/deviceInfos`, {
        method: 'GET',
        params,
    });
}

/**
 * 删除设备
 */

export async function delEquipment(params: any) {
    return request(`/api/device/${params}`, { method: 'DELETE' });
}

/**
 * 历史数据
 */
export async function getHistoryData(params: any) {
    const { id, value } = params;
    return request(`/api/plugins/telemetry/DEVICE/${id}/values/timeseries`, {
        method: 'GET',
        params: value,
    });
}

/**
 * 获取用户列表
 */
export async function getUserList(params?: any) {
    return request(`/openapi/v1/user/list`, { method: 'GET', params });
}

/**
 * 新增用户
 */

export async function addUser(params: any) {
    return request('/openapi/v1/user/add', { method: 'POST', data: params });
}

/**
 * 删除用户
 */
export async function delUser(params: any) {
    return request(`/openapi/v1/user/delete/${params}`, {
        method: 'POST',
    });
}

/**
 * 更新用户
 */
export async function updateUser(params: any) {
    return request(`/openapi/v1/user/update`, {
        method: 'POST',
        data: params,
    });
}

/**
 * 权限列表
 */
export async function getResourceList() {
    return request('/openapi/v1/resource/list', { method: 'GET' });
}

/**
 * 获取角色列表
 */
export async function getRoleList(params?: any) {
    return request(`/openapi/v1/role/list`, { method: 'GET', params });
}

/**
 * 新增角色
 */
export async function addRole(params?: any) {
    return request(`/openapi/v1/role/add`, { method: 'POST', data: params });
}

/**
 * 删除角色
 */
export async function delRole(params?: any) {
    return request(`/openapi/v1/role/delete/${params}`, {
        method: 'post',
    });
}

/**
 * 更新角色
 */
export async function updateRole(params: any) {
    return request(`/openapi/v1/role/update`, {
        method: 'POST',
        data: params,
    });
}
