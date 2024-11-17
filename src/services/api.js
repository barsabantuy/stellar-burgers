import { checkResponse } from '../utils';

const DOMAIN = 'https://norma.nomoreparties.space';

const request = async (path, options) => {
    return fetch(`${DOMAIN}/${path}`, options)
        .then(checkResponse)
}

export const fetchIngredients = async () => {
    return request('api/ingredients');
}

export const postOrder = async (ingredients) => {
    return request('api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: [...ingredients] })
    })
}

export const registerRequest = async form => {
    return request('api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
    })
        .then(saveTokens)
}

export const loginRequest = async form => {
    return request('api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
    })
        .then(saveTokens)
}

export const forgotPasswordRequest = async form => {
    return request('api/password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
    })
}

export const resetPasswordRequest = async form => {
    return request('api/password-reset/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
    })
}

export const refreshToken = async () => {
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

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === 'jwt expired') {
            const refreshData = await refreshToken();
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

const saveTokens = response => {
    if (!response.success) {
        return Promise.reject(response);
    }
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('accessToken', response.accessToken);
    return response;
}

const deleteTokens = response => {
    if (!response.success) {
        return Promise.reject(response);
    }
    localStorage.setItem('refreshToken', null);
    localStorage.setItem('accessToken', null);
    return response;
}

export const getUserRequest = () => fetchWithRefresh(`${DOMAIN}/api/auth/user`, {
    method: 'GET',
    headers: {
        authorization: localStorage.getItem('accessToken')
    },
})

export const updateUserRequest = form => fetchWithRefresh(`${DOMAIN}/api/auth/user`, {
    method: 'PATCH',
    headers: {
        authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify(form)
})

export const logoutRequest = async () => {
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
