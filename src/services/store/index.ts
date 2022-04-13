import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from './reducers/ingredients-slice'
import orderSlice from './reducers/order-slice'
import constructorSlice from './reducers/constructor-slice'
import modalSlice from './reducers/modal-ingredient-slice'

const rootReducer = combineReducers({
    ingredientsSlice,
    orderSlice,
    constructorSlice,
    modalSlice,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']