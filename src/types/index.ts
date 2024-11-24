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
    readonly image_mobile: string;
    readonly image_large: string;
    readonly __v: number;
};

export type TIngredientItem = TIngredient & {
    uuid: string;
};

export type TOrder = {
    readonly name: string;
    readonly order: { readonly number: number }
};

export type TUser = {
    readonly email: string;
    readonly name: string;
};

export type TUserResponse = { user: TUser };