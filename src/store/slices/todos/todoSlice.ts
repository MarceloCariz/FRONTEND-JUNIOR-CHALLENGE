import { createSlice } from "@reduxjs/toolkit";
import { ITodo } from "interfaces";

export interface TodoState {
    todos: ITodo[];
    todoActive: ITodo;
    totalDone: number;
}

const initialState:TodoState = {
    todos: [],
    todoActive: undefined,
    totalDone: 0,
}



export const todoSlice = createSlice({
    name:'todos',
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload.todos;
            state.todos = state.todos.sort((a,b) => (a.id - b.id))
            return state;
        },
        addNewTodo: (state, action) => {
            state.todos = [ action.payload,...state.todos];
            return state
        },
        changeCheckedTodo: (state, action) => {
            state.todos = state.todos.map((todo) => {
                if(todo.id !== action.payload.id) return todo;
                todo.checked = !action.payload.checked;
                return todo
            });

            return state;
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => (todo.id !== action.payload.id));
            // state.totalDone = state.todos.filter((todo) => todo.checked === true).length;
            return state;
        },
        activeTodo: (state, action) => {
            state.todoActive = action.payload;
            return state;
        },
        desactivateTodo : (state) => {
            state.todoActive = undefined;
            return state;
        },
        updateTodoLabel: (state, action) =>{
            state.todos = state.todos.map((todo) => {
                if(todo.id !== action.payload.id) return todo;
                todo.label = action.payload.label;
                return todo;
            });
            state.todoActive = undefined;
            return state;
        },
        refreshDoneTasks:(state) =>{
            state.totalDone = state.todos.filter((todo) => todo.checked === true).length;
            state.todos = state.todos.sort((a,b) => Number(a.checked) - Number(b.checked))
            return state;
        }
    }
})


export const {
    setTodos,
    changeCheckedTodo,
    removeTodo,
    refreshDoneTasks,
    addNewTodo,
    activeTodo,
    updateTodoLabel,
    desactivateTodo
} = todoSlice.actions