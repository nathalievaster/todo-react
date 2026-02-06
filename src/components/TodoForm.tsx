import { useState } from "react";
import type { Status } from "../interfaces/Todo";
import * as yup from "yup";

interface TodoFormProps {
  onAdd: (todo: {
    title: string;
    description?: string;
    status: Status;
  }) => void;
}

const todoSchema = yup.object({
  title: yup
    .string()
    .required("Titel är obligatorisk")
    .min(3, "Titel måste vara minst 3 tecken"),

  description: yup
    .string()
    .max(200, "Beskrivning får max vara 200 tecken"),

  status: yup
    .mixed<"not-started" | "in-progress" | "done">()
    .oneOf(["not-started", "in-progress", "done"])
    .required()
});

const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("not-started");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await todoSchema.validate(
      { title, description, status },
      { abortEarly: false }
    );

    setError(null);

    onAdd({
      title,
      description,
      status
    });

    setTitle("");
    setDescription("");
    setStatus("not-started");

  } catch (err) {
    if (err instanceof yup.ValidationError) {
      setError(err.errors[0]); // visar första felet
    }
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Lägg till Todo</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Beskrivning (valfri)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as Status)}
      >
        <option value="not-started">Ej påbörjad</option>
        <option value="in-progress">Pågående</option>
        <option value="done">Avklarad</option>
      </select>

      <button className="submit" type="submit">Lägg till</button>
    </form>
  );
};

export default TodoForm;