/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import LADSlice from './ListAndDetailsSlice';
import { sagas } from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    LAD: LADSlice
  },
  middleware: (getDefaultMiddleware): any => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(sagas);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch