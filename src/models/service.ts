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
export async function addEquipment(params: any) {
    return request(`/api/device`, {
        method: 'POST',
        data: params,
    });
}
