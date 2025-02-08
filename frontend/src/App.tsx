import { useState, useEffect } from "react";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/todos`, {
        title: newTodo,
        completed: false,
      });
      setNewTodo("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-901 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold mb-8">Todo List</h1>
                <form onSubmit={addTodo} className="mb-4">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700"
                    placeholder="Add a new todo"
                  />
                  <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add Todo
                  </button>
                </form>
                <ul>
                  {todos.map((todo) => (
                    <li
                      key={todo.id}
                      className="flex items-center justify-between bg-gray-100 p-4 my-2 rounded"
                    >
                      <span>{todo.title}</span>
                      <span className={todo.completed ? "text-green-500" : "text-red-500"}>
                        {todo.completed ? "Completed" : "Pending"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
