import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Advice {
    id: number;
    description: string;
    link: string;
    title: string;
}

export interface History {
    id: number;
    title: string;
    year_id: number;
    advice: Advice;
}

const initialState: History[] = [];

export const slice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setHistory: (_, { payload }: PayloadAction<History[]>) => payload,
    },
});

export const { setHistory } = slice.actions;

export default slice.reducer;
