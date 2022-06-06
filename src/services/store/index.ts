import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import ingredientsSlice from './reducers/ingredients-slice'
import orderSlice from './reducers/order-slice'
import constructorSlice from './reducers/constructor-slice'
import modalSlice from './reducers/modal-ingredient-slice'
import userSlice from './reducers/user-slice'
import { wsApi } from "./reducers/ws-orders-slice";

const rootReducer = combineReducers({
    ingredientsSlice,
    orderSlice,
    constructorSlice,
    modalSlice,
    userSlice,
    [wsApi.reducerPath]: wsApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wsApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']