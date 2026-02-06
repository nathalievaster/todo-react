import type { Todo } from "../interfaces/Todo";
import TodoItem from "./ToDoItem";

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: Todo["status"]) => void;
}

const TodoList = ({ todos, onDelete, onUpdateStatus }: TodoListProps) => {
  if (todos.length === 0) {
    return <p>Inga todos ännu.</p>;
  }

  return (
    <div>
      <h2 style ={{ textAlign: "center"}}>Mina Todos</h2>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};

export default TodoList;
