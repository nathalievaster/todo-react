import { useEffect, useState } from "react";
import type { Todo, Status } from "./interfaces/Todo";
import {
  fetchTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "./services/Api";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/ToDoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //Hämta todos när appen laddas
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const data = await fetchTodos();
        setTodos(data);
      } catch (err) {
        setError("Kunde inte hämta todos");
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  //Skapa ny todo
  const handleAdd = async (newTodo: {
    title: string;
    description?: string;
    status: Status;
  }) => {
    try {
      const created = await createTodo(newTodo);
      setTodos((prev) => [...prev, created]);
    } catch {
      setError("Kunde inte lägga till todo");
    }
  };

  // Ta bort todo
  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch {
      setError("Kunde inte ta bort todo");
    }
  };

  // Uppdatera status
  const handleUpdateStatus = async (id: string, status: Status) => {
    try {
      const updated = await updateTodo(id, { status });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updated : todo))
      );
    } catch {
      setError("Kunde inte uppdatera todo");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Todo App</h1>

      {loading && <p>Laddar...</p>}
      {error && <p>{error}</p>}

      <TodoForm onAdd={handleAdd} />

      <TodoList
        todos={todos}
        onDelete={handleDelete}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}

export default App;