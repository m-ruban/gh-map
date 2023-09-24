import { Reducer } from '@reduxjs/toolkit';

import categories from 'src/models/categories';
import history from 'src/models/history';

export const reducers = {
    categories,
    history,
};

export type RootStore<R = typeof reducers> = { [K in keyof R]: R[K] extends Reducer<infer D> ? D : never };
