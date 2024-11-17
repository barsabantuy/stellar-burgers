export const checkResponse = response => {
    return response.ok
        ? response.json()
        : response.json().then((err) => Promise.reject(err));
}
