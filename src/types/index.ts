export type TForm = {
    [key: string]: string;
};

export type TIngredient = {
    readonly _id: string;
    readonly name: string;
    readonly type: 'bun' | 'sauce' | 'main';
    readonly proteins?: number;
    readonly fat?: number;
    readonly carbohydrates?: number;
    readonly calories?: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile?: string;
    readonly image_large?: string;
    readonly __v?: number;
};

export type TIngredientItem = TIngredient & {
    uuid: string;
};

export type TOrderCreated = {
    readonly name: string;
    readonly order: {
        readonly number: number;
    }
};

export type TUser = {
    readonly email: string;
    readonly name: string;
};

export type TUserResponse = { user: TUser };

export type TError = {} | string | null;

export type TFeedResponse = {
    success: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
};

export type TOrder = {
    readonly ingredients: string[];
    readonly _id: string;
    readonly name: string;
    readonly status: string;
    readonly number: number;
    readonly createdAt: string;
    readonly updatedAt: string;
}
