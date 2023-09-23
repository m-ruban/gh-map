import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Seo {
    id: number;
    name: string;
    keyword: string;
    desc?: string;
    full_text?: string;
    meta_keyword?: string;
}

export interface Category {
    id: number;
    alt_image: string;
    code: string;
    start: number;
    end: number;
    icon: string;
    seo: Seo;
}

const initialState: Category[] = [];

export const slice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (_, { payload }: PayloadAction<Category[]>) => payload,
    },
});

export const { setCategories } = slice.actions;

export default slice.reducer;
