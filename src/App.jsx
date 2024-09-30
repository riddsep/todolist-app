import "./App.css";
import { useState } from "react";

function App() {
  const [activity, setActivity] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState({});
  const [message, setMessage] = useState("");

  function generateId() {
    return Date.now();
  }

  function saveHandlerTodo(e) {
    e.preventDefault();
    if (!activity) return setMessage("Data tidak boleh kosong");
    setMessage("");

    if (edit.id) {
      const updateTodo = {
        ...edit,
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
        activity,
        done: false,
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
  function doneTodoHandler(todo) {
    const updateTodo = {
      ...todo,
      done: todo.done ? false : true,
    };

    const matchingTodo = todos.findIndex(
      (currentTodo) => currentTodo.id === todo.id
    );
    const updateTodos = [...todos];
    updateTodos[matchingTodo] = updateTodo;
    setTodos(updateTodos);
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
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  name="done"
                  checked={todo.done}
                  onChange={() => doneTodoHandler(todo)}
                />
                {todo.activity}({todo.done ? "selesai" : "belum selesai"})
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
      ) : (
        <p>Belum ada aktivitas</p>
      )}
    </>
  );
}

export default App;
