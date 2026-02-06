import type { Todo } from "../interfaces/Todo";

const BASE_URL = "http://localhost:3000/todos";

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Kunde inte hämta todos");
  return response.json();
};

export const createTodo = async (
  todo: Omit<Todo, "id">
): Promise<Todo> => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });

  if (!response.ok) throw new Error("Kunde inte skapa todo");

  return response.json();
};

export const deleteTodo = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Kunde inte ta bort todo");
};

export const updateTodo = async (
  id: string,
  updatedData: Partial<Omit<Todo, "id">>
): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) throw new Error("Kunde inte uppdatera todo");

  return response.json();
};
