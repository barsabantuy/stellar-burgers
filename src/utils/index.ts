export const checkResponse = (response: Response): Promise<any> => {
    return response.ok
        ? response.json()
        : response.json().then((err) => Promise.reject(err));
};

export const UNKNOWN_ERROR: string = 'An unknown error occurred'