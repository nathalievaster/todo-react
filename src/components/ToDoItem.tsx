import type { Todo, Status } from "../interfaces/Todo";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: Status) => void;
}

const TodoItem = ({ todo, onDelete, onUpdateStatus }: TodoItemProps) => {
  return (
    <div style={{ border: "1px solid gray", padding: "2em", margin: "2em", borderRadius: "20px" }}>
      <h3 style={{ padding: "1em"}}>{todo.title}</h3>
      {todo.description && <p style={{ padding: "1em"}}>{todo.description}</p>}

      <p style={{ padding: "1em"}}>Status: {todo.status}</p>

      <select
        value={todo.status}
        onChange={(e) =>
          onUpdateStatus(todo.id, e.target.value as Status)
        }
      >
        <option value="not-started">Ej påbörjad</option>
        <option value="in-progress">Pågående</option>
        <option value="done">Avklarad</option>
      </select>

      <button className="delete" onClick={() => onDelete(todo.id)}>Ta bort</button>
    </div>
  );
};

export default TodoItem;
