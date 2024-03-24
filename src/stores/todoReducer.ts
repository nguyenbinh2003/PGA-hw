import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { ITodo } from "@/src/interfaces/todo-interface";

const initialState: ITodo[] = [
  {
    id: uuidv4(),
    title: "Let's todo something",
  },
];

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = { id: uuidv4(), title: action.payload };
      const isTodo = state.find((todo) => todo.title === action.payload);
      if (!isTodo) state.push(todo);
      return;
    },

    editTodo: (state, action) => {
      const { id, title }: ITodo = action.payload;
      const todo: ITodo | undefined = state.find((item) => item.id === id);

      if (todo) todo!.title = title;
      return;
    },

    removeTodo: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        const newState = [...state.slice(0, index), ...state.slice(index + 1)];
        return newState;
      }
      return;
    },
  },
});

export const { addTodo, editTodo, removeTodo } = todosSlice.actions;

export default todosSlice.reducer;
