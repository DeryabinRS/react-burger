import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from './reducers/ingredients-slice'

const rootReducer = combineReducers({
    ingredientsSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']