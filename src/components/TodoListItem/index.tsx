import "./styles.css";


interface Props {
  id: number;
  label: string;
  checked: boolean;
  position: number;
  onCheck: (todoId : number, isChecked: boolean) => void;
  onDelete:(todoId : number,) => void;
  activeTodo: (todoId: number) => void;
}

const TodoListItem = ({ onCheck, checked, onDelete, label , id, position,activeTodo}: Props) => (
  <div className="todo-list-item" >
    <p>{position + 1}</p>
    <div
      tabIndex={0}
      role="checkbox"
      aria-checked
      className="todo-list-item-content"
    >
      <div></div>
      <input
        tabIndex={-1}
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheck(id, checked)}
      />
      <span onClick={() => activeTodo(id)} className={checked ? "todo-list-item-checked" : ""}>
        {label}
      </span>
      <div></div>
    </div>
    <button type="button" className="todo-list-item-delete" onClick={() => onDelete(id)}>
      x
    </button>
  </div>
);

export default TodoListItem;
