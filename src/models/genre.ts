import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GenreShortItem } from 'src/models/genres';
import { Advice } from 'src/models/history';
import GenreEventType from 'src/modules/GenreEventType';

export interface CategoryEvent {
    id: number;
    article_id?: number;
    description: string;
    image: string;
    link?: string;
    title: string;
    type: GenreEventType;
}

interface CategoryTimelineItems {
    advice?: Advice;
    category_events: CategoryEvent[];
    id: number;
    title: string;
    year_id: number;
}

interface Genre extends GenreShortItem {
    category_timeline_items: CategoryTimelineItems[];
    isShowView?: boolean;
}

const initialState: Genre = null;

export const slice = createSlice({
    name: 'genre',
    initialState,
    reducers: {
        setGenre: (_, { payload }: PayloadAction<Genre>) => payload,
        toogleGenreView: (state) => {
            state.isShowView = !state.isShowView;
        },
    },
});

export const { setGenre, toogleGenreView } = slice.actions;

export default slice.reducer;
