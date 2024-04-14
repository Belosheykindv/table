import { configureStore } from '@reduxjs/toolkit'
import tablesPageSliceReducer from './tablesReducer.ts'
export const store = configureStore({
    reducer: {
        tables: tablesPageSliceReducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch