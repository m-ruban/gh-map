import { Reducer } from '@reduxjs/toolkit';

import genres from 'src/models/genres';
import history from 'src/models/history';

export const reducers = {
    genres,
    history,
};

export type RootStore<R = typeof reducers> = { [K in keyof R]: R[K] extends Reducer<infer D> ? D : never };
