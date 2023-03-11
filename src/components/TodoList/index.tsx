import TodoListItem from "components/TodoListItem";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { activatingTodo, deleteTodo, updateCheckedTodo } from "store/slices/todos/thunk";
import "./styles.css";

const TodoList = () => {

  const dispatch = useAppDispatch()
  const {todos, totalDone} = useAppSelector(state => state.todo);



  const handleDelete = (todoId: number) => {
    // Fix an ability to delete task
    dispatch(deleteTodo(todoId));

  };

  const toggleCheck = ( todoId : number, isChecked: boolean) => {
    // Fix an ability to toggle task
    dispatch(updateCheckedTodo(todoId, isChecked));

  };

  const activeTodo = (todoId: number) => {
    dispatch(activatingTodo(todoId));
  }

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do: {todos.length - totalDone}</span>
      <div className={todos.length === 0 ? "" : "todo-list-content"}>
        {/* Fix an ability to render todos */}
        {
          todos.map((todo, index)=>(
              <TodoListItem 
                key={todo.id} 
                id={todo.id}
                onCheck={toggleCheck} 
                onDelete={handleDelete} 
                label={todo.label} 
                checked={todo.checked}
                activeTodo={activeTodo}
                position={index}
              />
          ))
        }
      </div>
      {
        todos.length === 0 && (
          <div className="no-todos">
            Looks like you&apos;re absolutely free today!
          </div>
        )
      }

    </div>
  );
};

export default TodoList;
