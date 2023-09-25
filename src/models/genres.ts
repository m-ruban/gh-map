import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Seo {
    id: number;
    name: string;
    keyword: string;
    desc?: string;
    full_text?: string;
    meta_keyword?: string;
}

export interface Genre {
    id: number;
    alt_image: string;
    code: string;
    start: number;
    startKey: number;
    end: number;
    endKey: number;
    icon: string;
    seo: Seo;
}

const initialState: Genre[] = [];

export const slice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        setGenres: (_, { payload }: PayloadAction<Genre[]>) => payload,
    },
});

export const { setGenres } = slice.actions;

export default slice.reducer;
