import { format, isToday, isYesterday } from 'date-fns';
import { ru } from 'date-fns/locale';
import {TIngredient} from "../types";

export const checkResponse = (response: Response): Promise<any> => {
    return response.ok
        ? response.json()
        : response.json().then((err) => Promise.reject(err));
};

export const UNKNOWN_ERROR: string = 'An unknown error occurred'

export function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const dayLabel = isToday(date)
        ? 'Сегодня'
        : isYesterday(date)
            ? 'Вчера'
            : format(date, 'd MMMM', { locale: ru });

    const timeString = format(date, 'HH:mm', { locale: ru });

    return `${dayLabel}, ${timeString} i-GMT+3`;
}

export function formatNumber(number: number): string {
    return new Intl.NumberFormat('ru-RU').format(number);
}

export const countTotalPrice = (ingredients: TIngredient[], ingredientIds: string[]) => {
    if (!ingredients || !ingredients) {
        return 0;
    }

    return ingredientIds.reduce((acc, ingredientId) => {
        const found = ingredients.find(ing => ing._id === ingredientId);
        return acc + (found?.price ?? 0);
    }, 0);
}

export const ORDER_STATUS: {[key: string]: string} = {
    'pending': 'В работе',
    'cancelled': 'Отменен',
    'created': 'Создан',
    'done': 'Выполнен',
};
