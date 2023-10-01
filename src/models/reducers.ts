import { Reducer } from '@reduxjs/toolkit';

import genre from 'src/models/genre';
import genres from 'src/models/genres';
import history from 'src/models/history';

export const reducers = {
    genre,
    genres,
    history,
};

export type RootStore<R = typeof reducers> = { [K in keyof R]: R[K] extends Reducer<infer D> ? D : never };
