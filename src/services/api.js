const DOMAIN = 'https://norma.nomoreparties.space';

export const fetchIngredients = () => {
    return fetch(`${DOMAIN}/api/ingredients`);
}

export const postOrder = (ingredients) => {
    return fetch(`${DOMAIN}/api/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: [...ingredients] })
    })
}
