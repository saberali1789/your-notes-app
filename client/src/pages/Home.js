import { useEffect, useState } from "react";
import "../home.css";
import { ReactComponent as Logo } from "../img/logo.svg";
import { ReactComponent as Moon } from "../img/moon.svg";
import user from "../img/user.png";
import axios from "axios";

const Home = ({ toggleRtl, lang}) => {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const [todos, setTodos] = useState([]);
  const [looped, setLooped] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [darkMode, setDarkMode] = useState( false );
  const [drop, setDrop] = useState(false);


  useEffect(() => {
    const mode = localStorage.getItem("theem");
    setDarkMode(mode === "true");
  }, []);

  const toggleTheem = ()=>{
    setDarkMode(!darkMode);
    localStorage.setItem('theem', JSON.stringify(!darkMode))
  }
  useEffect(() => {
    if (!userId) {
      window.location.href = "/login";
    }
  }, [userId]);

  useEffect(() => {
    GetTodos();
  }, [todos]);

  const GetTodos = async () => {
    try {
      const response = await axios.get("https://your-notes-app-2ppx.onrender.com/todos/");
      if (response.data && response.data.response) {
        setLooped(response.data.response);
      } else {
        console.error("Invalid response data:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const GetTodos = async () => {
  //   await fetch(`https://your-notes-app-2ppx.onrender.com/todos/`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data && data.response) {
  //         setLooped(data.response);
  //       } else {
  //         console.error("Invalid response data:", data);
  //       }
  //     })
  //     .catch((err) => console.error("Error:", err));
  // };

  const completeTodo = async (id) => {
    const data = await fetch(`https://your-notes-app-2ppx.onrender.com/todos/complete/${id}`).then(
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
    const data = await fetch("https://your-notes-app-2ppx.onrender.com/todos/", {
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
    const data = await fetch(`https://your-notes-app-2ppx.onrender.com/todos/delete/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());

    if (data && data.result && data.result._id) {
      setTodos((todos) => todos.filter((todo) => todo._id !== data.result._id));
    } else {
      console.error("Invalid response data:", data);
    }
  };

  const [compTodos, setCompTodos] = useState([]);

  const filterTodos = async (filter) => {
    try {
      const response = await axios.get("https://your-notes-app-2ppx.onrender.com/todos");
      let filteredTodos = [];
      if (filter === "completed") {
        filteredTodos = response.data.response.filter(
          (todo) => todo.complete === true
        );
      } else if (filter === "active") {
        filteredTodos = response.data.response.filter(
          (todo) => todo.complete === false
        );
      } else {
        filteredTodos = response.data.response;
      }
      setLooped(filteredTodos);
    } catch (error) {
      console.error("Error filtering todos:", error);
    }
  };

  return (
    <div className={`main ${darkMode ? "dark-mode" : ""}`}>
      <nav className="">
        <div className="logo-side">
          <Logo className="logo" />
          <h2>Your Notes</h2>
        </div>
        <ul>
          <li onClick={toggleRtl}>Ar</li>
          <li>
            <button className="mode" onClick={toggleTheem}>
              <Moon />
            </button>
          </li>
          <li
            onClick={() => {
              setDrop(!drop);
            }}
          >
            <img src={user} alt="Logo" />
            {drop ? (
              <div className="dropp">
                <p>{lang ? "hi " : " مرحبا  "}{ userName} </p>
                <button
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  LogOut
                </button>
              </div>
            ) : (
              ""
            )}
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
          {looped.length > 0 ? (
            looped.map((todo) => (
              <div
                className={"todo" + (todo.complete ? " is-complete" : "")}
                key={todo._id}
                onClick={() => completeTodo(todo._id)}
              >
                <div className="checkbox" key={todo._id}></div>
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

        <div className="footer todos">
          <div className="count">
            <p>{looped.length} {lang ? "Tasks" : "ملاحظات متبقية "}</p>
          </div>
          <div className="lists">
            <div
              className={`btn-footer ${
                looped.length === todos.length ? "activeb" : ""
              }`}
              onClick={() => filterTodos("all")}
            >
              {lang ? "All" : "الكل "}
            </div>
            <div
              className={`btn-footer ${
                looped.length !== todos.length ? "activeb" : ""
              }`}
              onClick={() => filterTodos("active")}
            >
              {lang ? "Active" : "متبقي"}
            </div>
            <div
              className={`btn-footer ${compTodos.length > 0 ? "activeb" : ""}`}
              onClick={() => filterTodos("completed")}
            >
              {lang ? "Completed" : "منتهي "}
            </div>
          </div>
          <div className="clear">{lang ? "Clear" : " مسح المنتهى"}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;