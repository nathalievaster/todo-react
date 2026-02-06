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

  // Lagrar fel vid fälten
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await todoSchema.validate(
        { title, description, status },
        { abortEarly: false }
      );

      setErrors({});

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
        const newErrors: { title?: string; description?: string } = {};

        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path as "title" | "description"] = error.message;
          }
        });

        setErrors(newErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Lägg till Todo</h2>

      <div>
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && (
          <p style={{ color: "red", margin: "4px 0" }}>
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <textarea
          placeholder="Beskrivning (valfri)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <p style={{ color: "red", margin: "4px 0" }}>
            {errors.description}
          </p>
        )}
      </div>

      <div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
        >
          <option value="not-started">Ej påbörjad</option>
          <option value="in-progress">Pågående</option>
          <option value="done">Avklarad</option>
        </select>
      </div>

      <button className="submit" type="submit">
        Lägg till
      </button>
    </form>
  );
};

export default TodoForm;
