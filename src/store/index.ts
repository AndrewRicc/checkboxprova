import { configureStore } from "@reduxjs/toolkit";
import {todoSlice} from "./slices/todo.slice";
import {tabSlice} from "./slices/tab.slice";

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    tab: tabSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>