import { toastError } from 'components/notifications/toatsNotifications';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import {useState, ChangeEvent, FormEvent, useRef, useEffect} from 'react'
import { crateNewTodo, updatingTodoLabel } from 'store/slices/todos/thunk';
import {  desactivateTodo } from 'store/slices/todos/todoSlice';
import './styles.css';


const TodoForm = () => {
    const [task, setTask] = useState('');
    const [newTodoLabel, setNewTodoLabel] = useState('');
    const [error, setError] = useState(false);

    const {todoActive} = useAppSelector(state => state.todo);

    useEffect(() => {
        if(!todoActive) return;
        setNewTodoLabel(todoActive.label);
    }, [todoActive])


    const dispatch = useAppDispatch();

    const inputRef = useRef(null);

    const handleOnChange = ({target}: ChangeEvent<HTMLInputElement>) => {
        if(todoActive){
            setNewTodoLabel(target.value);
            return;
        };
        setTask(target.value);
    }

    const handleOnSubmit  = (e : FormEvent) => {
        e.preventDefault();
        if((!todoActive && task.trim() === '') ||  (todoActive && newTodoLabel.trim() === '')){
            toastError('The text box is empty');
            setError(true);
            setTimeout(() => (setError(false)), 2500);
            return ;
        };
        if(todoActive){
            const newTodo = {...todoActive, label: newTodoLabel};
            dispatch(updatingTodoLabel(newTodo));
            setNewTodoLabel('');
            return;
        };

        dispatch(crateNewTodo(task));
        setTask('');
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit} className='form-container'>
                <div className='container'>
                    <input 
                        ref={inputRef} 
                        onChange={handleOnChange} 
                        value={todoActive ? newTodoLabel : task} 
                        className={error ? "todo-input-error" : "todo-input" }
                        type="text" 
                        placeholder={error ? "The text box is empty" :'Enter new to do' }
                    />
                    {
                        todoActive && (
                            <button type='button' className='todo-button-cancel' onClick={() => dispatch(desactivateTodo())}>
                                Cancel
                            </button>
                        )
                    }
                    <button className={!todoActive ?'todo-button' : 'todo-button-active'} type="submit">
                        {todoActive ? "Editing to do" : "Add To do"}
                    </button>
                </div>


            </form>
        </div>

    )
}

export default TodoForm