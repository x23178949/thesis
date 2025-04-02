import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchTodos = async () => {
    const res = await fetch(`${backendUrl}/todos`);
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      title,
      completed: false,
    };

    const res = await fetch(`${backendUrl}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    const data = await res.json();
    setTodos((prev) => [...prev, data]);
    setTitle("");
  };

  const deleteTodo = async (id) => {
    await fetch(`${backendUrl}/todos/${id}`, {
      method: "DELETE",
    });

    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full p-6">
      <div className="bg-white dark:bg-[#1a1a1a] shadow-md rounded p-6 w-full max-w-xl text-black dark:text-white">
        <h1 className="text-2xl font-bold mb-4 text-center">📝 Todo App</h1>

        <form onSubmit={addTodo} className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none dark:bg-[#333] dark:text-white"
            placeholder="Enter a todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </form>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between px-4 py-2 border rounded bg-white text-black dark:bg-zinc-800 dark:text-white"
            >
              <span>{todo.title}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
