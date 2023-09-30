import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Seo {
    id: number;
    name: string;
    keyword: string;
    descr?: string;
    full_text?: string;
    meta_keyword?: string;
}

export interface GenreShortItem {
    id: number;
    alt_image: string;
    code: string;
    start: number;
    startKey: number;
    end: number;
    endKey: number;
    icon: string;
    short_name: string;
    seo: Seo;
}

const initialState: GenreShortItem[] = [];

export const slice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        setGenres: (_, { payload }: PayloadAction<GenreShortItem[]>) => payload,
    },
});

export const { setGenres } = slice.actions;

export default slice.reducer;
