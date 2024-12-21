import { checkResponse } from '../utils';
import {TForm, TIngredient, TOrderCreated, TOrder, TUserResponse} from "../types";

export const FEED_WEBSOCKET_URL = 'wss://norma.nomoreparties.space/orders/all';
export const USER_ORDERS_WEBSOCKET_URL = 'wss://norma.nomoreparties.space/orders'; // with token

const DOMAIN = 'https://norma.nomoreparties.space';

type TBaseApiResponse = {
    success: boolean;
    message?: string;
    headers?: Headers;
};

type TApiResponse<T = {}> = TBaseApiResponse & T;

type TTokenApiResponse<T> = TApiResponse<T> & {
    refreshToken: string;
    accessToken: string;
}

const request = async (path: string, options?: RequestInit): Promise<any> => {
    return fetch(`${DOMAIN}/${path}`, options)
        .then(checkResponse);
};

export const fetchIngredients = async (): Promise<{ data: TIngredient[] }> => {
    return request('api/ingredients');
}

export const fetchOrderRequest = async (orderId: string): Promise<{ success: boolean, orders: TOrder[] }> => {
    return request(`api/orders/${orderId}`);
}

export const postOrder = async (ingredients: ReadonlyArray<string>): Promise<TApiResponse & TOrderCreated> => {
    return fetchWithRefresh(`${DOMAIN}/api/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients: [...ingredients] })
    });
}

export const registerRequest = async (form: TForm): Promise<TUserResponse> => {
    return request('api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
    })
        .then(saveTokens)
}

export const loginRequest = async (form: TForm): Promise<TUserResponse> => {
    return request('api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
    })
        .then(saveTokens)
}

const saveTokens = (response: TTokenApiResponse<any>): TTokenApiResponse<any> => {
    if (!response.success) {
        return Promise.reject(response);
    }
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('accessToken', response.accessToken);
    return response;
}

export const forgotPasswordRequest = async (form: TForm): Promise<TApiResponse> => {
    return request('api/password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
    })
}

export const resetPasswordRequest = async (form: TForm): Promise<TApiResponse> => {
    return request('api/password-reset/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
    })
}

export const refreshToken = async (): Promise<TTokenApiResponse<any>> => {
    return request('auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    })
        .then(saveTokens);
};

export const fetchWithRefresh = async (url: string, options: any): Promise<any> => {
    try {
        const optionsWithToken = getOptionsWithAuthToken(options, localStorage.getItem('accessToken'));
        const res = await fetch(url, optionsWithToken);
        return await checkResponse(res);
    } catch (err: any) {
        if (err.message === 'jwt expired') {
            const refreshData = await refreshToken();
            const optionsWithToken = getOptionsWithAuthToken(options, refreshData.accessToken);
            const res = await fetch(url, optionsWithToken);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

const getOptionsWithAuthToken = (options: any, token: string | null) => {
    return {
        ...options,
        headers: {
            ...options.headers,
            authorization: token
        },
    };
}

const deleteTokens = (response: TBaseApiResponse) => {
    if (!response.success) {
        return Promise.reject(response);
    }
    localStorage.setItem('refreshToken', '');
    localStorage.setItem('accessToken', '');
    return response;
}

export const getUserRequest = (): Promise<TUserResponse> => fetchWithRefresh(`${DOMAIN}/api/auth/user`, {
    method: 'GET',
})

export const updateUserRequest = (form: TForm): Promise<TUserResponse> => fetchWithRefresh(`${DOMAIN}/api/auth/user`, {
    method: 'PATCH',
    body: JSON.stringify(form)
})

export const logoutRequest = async (): Promise<TBaseApiResponse> => {
    return request('api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    })
        .then(deleteTokens)
}
