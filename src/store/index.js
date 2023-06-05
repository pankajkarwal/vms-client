import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './reducer/todosSlice'
import counterSlice from './reducer/counterSlice'

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        counter: counterSlice
    }
})

