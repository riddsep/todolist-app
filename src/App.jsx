import "./App.css";
import { useState } from "react";

function App() {
  const [activity, setActivity] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState({});
  const [message, setMessage] = useState("");

  console.log(edit);
  function generateId() {
    return Date.now();
  }

  function saveHandlerTodo(e) {
    e.preventDefault();
    if (!activity) return setMessage("data tidak boleh kosong");

    if (edit.id) {
      const updateTodo = {
        id: edit.id,
        activity,
      };
      const matchingTodo = todos.findIndex((todo) => todo.id === edit.id);
      const updateTodos = [...todos];
      updateTodos[matchingTodo] = updateTodo;
      setTodos(updateTodos);
      return cancelHandlerTodo();
    }

    setTodos([
      ...todos,
      {
        id: generateId(),
        activity: activity,
      },
    ]);
    setActivity("");
  }

  function removeHandlerTodo(todoId) {
    const matchingTodo = todos.filter((todo) => todo.id !== todoId);
    setTodos(matchingTodo);
    edit.id && cancelHandlerTodo();
  }
  function editHandlerTodo(todo) {
    setActivity(todo.activity);
    setEdit(todo);
  }
  function cancelHandlerTodo() {
    setEdit({});
    setActivity("");
  }

  return (
    <>
      <h1>Simple TodoList</h1>
      <p>{message}</p>
      <form onSubmit={saveHandlerTodo}>
        <div>
          <input
            type="text"
            placeholder="Masukkan aktivitas anda"
            value={activity}
            onChange={(e) => {
              setActivity(e.target.value);
            }}
          />
          <button type="submit">{edit.id ? "Simpan" : "Tambah"}</button>
          {edit.id && <button onClick={cancelHandlerTodo}>Batal edit</button>}
        </div>
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.activity}{" "}
              <button
                onClick={() => {
                  editHandlerTodo(todo);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  removeHandlerTodo(todo.id);
                }}
              >
                Hapus
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
