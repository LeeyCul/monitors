import request from '@/utils/request';

/**
 * login
 */
export async function login(params: any) {
    return request(`/api/auth/login`, {
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
    return request(
        `/api/plugins/telemetry/DEVICE/974e0250-c665-11ea-b841-5372d88158bc/values/timeseries`,
        { method: 'GET', params },
    );
}
