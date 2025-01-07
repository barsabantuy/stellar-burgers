import { TIngredient } from '../types';

export const checkResponse = (response: Response): Promise<any> => {
    return response.ok
        ? response.json()
        : response.json().then((err) => Promise.reject(err));
};

export const UNKNOWN_ERROR: string = 'An unknown error occurred';

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = getYesterday();

    let dayLabel: string;
    if (isSameDay(date, today)) {
        dayLabel = 'Сегодня';
    } else if (isSameDay(date, yesterday)) {
        dayLabel = 'Вчера';
    } else {
        dayLabel = formatDayMonthRu(date);
    }

    const timeString = formatTimeRuGMT3(date);
    return `${dayLabel}, ${timeString} i-GMT+3`;
}

export function formatNumber(num: number): string {
    return new Intl.NumberFormat('ru-RU').format(num);
}

export const countTotalPrice = (ingredients: TIngredient[], ingredientIds: string[]) => {
    if (!ingredients || !ingredientIds) {
        return 0;
    }

    return ingredientIds.reduce((acc, ingredientId) => {
        const found = ingredients.find((ing) => ing._id === ingredientId);
        return acc + (found?.price ?? 0);
    }, 0);
};

export const ORDER_STATUS: { [key: string]: string } = {
    pending: 'В работе',
    cancelled: 'Отменен',
    created: 'Создан',
    done: 'Выполнен',
};

function isSameDay(a: Date, b: Date): boolean {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function getYesterday(): Date {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d;
}

function formatDayMonthRu(date: Date): string {
    return date.toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
    });
}

function formatTimeRuGMT3(date: Date): string {
    return date.toLocaleString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Etc/GMT-3',
    });
}