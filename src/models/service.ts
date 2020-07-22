import request from '@/utils/request'

/**
 * login
 */
export async function login(params: any) {
    return request(`/api/auth/login`, {
        method: 'POST',
        data: params
    })
}

