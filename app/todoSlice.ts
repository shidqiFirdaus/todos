import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { ActionSheetIOS } from "react-native";
type Todo = { task: string; done: boolean };
type TodoList = { title: string; todos: Todo[] };
interface TodoState {
  todolists: TodoList[];
}

// Define the initial state using that type
const initialState: TodoState = {
  todolists: [{ title: "redux", todos: [{ task: "testRedux", done: true }] }],
};

export const todoSlice = createSlice({
  name: "todoLists",
  initialState,
  reducers: {
    newList: (state, action: PayloadAction<string>) => {
      state.todolists.push({ title: action.payload, todos: [] });
    },
    deleteList: (state, action: PayloadAction<number>) => {
      state.todolists = state.todolists.filter(
        (item, i) => i !== action.payload,
      );
    },
    addTodo: (
      state,
      action: PayloadAction<{ index: number; task: string }>,
    ) => {
      state.todolists
        .at(action.payload.index)
        ?.todos.push({ task: action.payload.task, done: false });
    },
    markDone: (
      state,
      action: PayloadAction<{
        todoIndex: number;
        taskIndex: number;
        todo: { task: string; done: boolean };
      }>,
    ) => {
      state.todolists[action.payload.todoIndex].todos[
        action.payload.taskIndex
      ] = {
        task: action.payload.todo.task,
        done: !action.payload.todo.done,
      };
    },
  },
});

export const { newList, deleteList, addTodo, markDone } = todoSlice.actions;

export const selectCount = (state: RootState) => state;

export default todoSlice.reducer;
