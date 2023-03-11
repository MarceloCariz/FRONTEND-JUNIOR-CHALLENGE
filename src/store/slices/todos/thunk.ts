import { todoApi } from "api/todoApi"
import { toastError, toastSuccess } from "components/notifications/toatsNotifications";
import { ITodo } from "interfaces";
import { activeTodo, addNewTodo, changeCheckedTodo, refreshDoneTasks, removeTodo, setTodos, updateTodoLabel } from "./todoSlice";


export const getTodos = () => {
    return async(dispatch:any, getState:any)=>{

        try {
            const {data} = await todoApi('/sss');
            dispatch(setTodos({todos: data}))
        } catch (error) {
            console.log(error)
            toastError('Error to get the data ')
        }

    }
}

export const crateNewTodo = (label: string) => {
    return async(dispatch:any, getState:any)=>{
        // const {data} = await todoApi('');
        const {todos} = getState().todo;

        try {
            const newTodo:ITodo = {
                id: todos.length,
                label,
                checked: false
            }
            await todoApi.post('',newTodo);
            dispatch(addNewTodo(newTodo));
            dispatch(refreshDoneTasks());   
            toastSuccess('Added succesfully');
        } catch (error) {
            console.log(error)
            toastError('Error adding task')
        }
    }
}

export const updateCheckedTodo = (id: number, checked: boolean) => {
    return async(dispatch:any, getState:any)=>{

        try {
            await todoApi.patch(`/${id}`);
            dispatch(changeCheckedTodo({id, checked}))
            dispatch(refreshDoneTasks());   
            toastSuccess(checked ? "Correctly unchecked" : "Correctly checked");
        } catch (error) {
            console.log(error)
            toastError('Error in editing the task')
        }
    }
}

export const deleteTodo = (id:number) => {
    return async(dispatch:any, getState:any) => {
        try {
            await todoApi.delete(`/${id}`);
            dispatch(removeTodo({id}));
            dispatch(refreshDoneTasks());   
            toastSuccess('Correctly deleted');
        } catch (error) {
            console.log(error)
            toastError('Error deleting task')
        }
    }
}

export const activatingTodo = (id: number) => {
    return (dispatch:any, getState:any) => {
        const {todos} = getState().todo;
        const todo = todos.find((todo:ITodo) => (todo.id === id));
        dispatch(activeTodo(todo));
    }
}

export const updatingTodoLabel = (updatedTodo: ITodo) => {
    return async(dispatch:any, getState:any) => {
        try {
            await todoApi.put(`/${updatedTodo.id}`,{label: updatedTodo.label}); // Solo si se tiene el metodo put en la api
            dispatch(updateTodoLabel(updatedTodo));
            dispatch(refreshDoneTasks());   
            toastSuccess('Correctly edited');
        } catch (error) {
            console.log(error)
            toastError('Error editing task')
        }
    }
}