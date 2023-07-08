import { useState, useEffect } from "react";
import "../home.css";
import { ReactComponent as Logo } from "../img/logo.svg";
import { ReactComponent as Moon } from "../img/moon.svg";
import user from "../img/user.png";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
  }, [todos]);

  const GetTodos = () => {
    fetch("http://localhost:3001/todos")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.response) {
          setTodos(data.response);
        } else {
          console.error("Invalid response data:", data);
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(`http://localhost:3001/todos/complete/${id}`).then(
      (res) => res.json()
    );

    if (data && data._id) {
      setTodos((todos) =>
        todos.map((todo) => {
          if (todo._id === data._id) {
            todo.complete = data.complete;
          }
          return todo;
        })
      );
    } else {
      console.error("Invalid response data:", data);
    }
  };

  const addTodo = async () => {
    const data = await fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());

    if (data) {
      setTodos([...todos, data]);
      setNewTodo("");
    } else {
      console.error("Invalid response data:", data);
    }
  };

  const deleteTodo = async (id) => {
    const data = await fetch(`http://localhost:3001/todos/delete/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());

    if (data && data.result && data.result._id) {
      setTodos((todos) => todos.filter((todo) => todo._id !== data.result._id));
    } else {
      console.error("Invalid response data:", data);
    }
  };

  return (
    <div className="main">
      <nav>
        <div className="logo-side">
          <Logo className="logo" />
          <h2>Your Notes</h2>
        </div>
        <ul>
          <li>Ar</li>
          <li>
            <Moon />
          </li>
          <li>
            {" "}
            <img src={user} alt="Logo" />
          </li>
        </ul>
      </nav>
      <div className="img-div"></div>
      <div className="todo-form">
        <div className="create-todo">
          <form action="">
            <label htmlFor="name"></label>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={addTodo}>
              +
            </div>
          </form>
        </div>
        <div className="todos">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div
                className={"todo" + (todo.complete ? " is-complete" : "")}
                key={todo._id}
                onClick={() => completeTodo(todo._id)}
              >
                <div className="checkbox"></div>
                <div className="text">{todo.text}</div>
                <div
                  className="delete-todo"
                  onClick={() => deleteTodo(todo._id)}
                >
                  x
                </div>
              </div>
            ))
          ) : (
            <p>You currently have no tasks</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
