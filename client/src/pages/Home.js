import { useState, useEffect } from "react"
import "../home.css";
import { ReactComponent as Logo } from '../img/logo.svg';
import { ReactComponent as Moon } from '../img/moon.svg';
import user from '../img/user.png';


// const http://localhost:3001/ = 'http://localhost:3001'

const Home = () => {
    
	const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {

    GetTodos();
  }, []);

  const GetTodos = () => {
    fetch("http://localhost:3001/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data.response))
      .catch((err) => console.error("Error: ", err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(`http://localhost:3001/todo/complete/${id}`).then((res) =>
      res.json()
    );

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }

        return todo;
      })
    );
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

    setTodos([...todos, data]);

    setPopupActive(false);
    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    const data = await fetch(`http://localhost:3001/todo/delete/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data.result._id));
  };
  
    return(


    
      <div className="main">
      <nav>
      <div className="logo-side"><Logo className="logo"/><h2>Your Notes</h2></div>
        
        <ul>
          <li>Ar</li>
          <li><Moon /></li>
          <li> <img src={require('../img/user.png')} alt="Logo" /></li>
        </ul>
      </nav>
      <div className="img-div"></div>
      <div className="todo-form">
        <div className="create-todo">
          <form action="">
            <label htmlFor="name"></label>
            {/* <input type="text" onChange={handleChange} /> */}

            <input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
						<div className="button" onClick={addTodo}>+</div>

          </form>
        </div>

        
			<div className="todos">
				{todos.length > 0 ? todos.map(todo => (
					<div className={
						"todo" + (todo.complete ? " is-complete" : "")
					} key={todo._id} onClick={() => completeTodo(todo._id)}>
						<div className="checkbox"></div>

						<div className="text">{todo.text}</div>

						<div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
					</div>
				)) : (
					<p>You currently have no tasks</p>
				)}
			</div></div>


			
			
					
			
		</div>

    )


}



export default Home