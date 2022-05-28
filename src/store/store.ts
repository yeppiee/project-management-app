import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { taskDealerApi } from './reducers/TaskDealerApi';
import userSlice from './reducers/UserSlice';
import boardFormSlice from './reducers/BoardFormSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  [taskDealerApi.reducerPath]: taskDealerApi.reducer,
  userSlice,
  boardFormSlice,
  [taskDealerApi.reducerPath]: taskDealerApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(taskDealerApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
