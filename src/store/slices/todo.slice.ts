import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {ToDo} from "../../App";

const todosAdapter = createEntityAdapter<ToDo>({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
})

export const todoSlice = createSlice({
  name: 'todo',
  initialState: todosAdapter.getInitialState(),
  reducers: {
    createTodo: todosAdapter.addOne,
    createManyTodo: todosAdapter.addMany,
    editTodo: todosAdapter.setOne,
    deleteTodo: todosAdapter.removeOne,
    deleteManyTodo: todosAdapter.removeMany,
  }
});

export const {
  createTodo,
  createManyTodo,
  editTodo,
  deleteTodo,
  deleteManyTodo,
} = todoSlice.actions

export default todoSlice.reducer