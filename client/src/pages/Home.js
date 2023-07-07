import { useState, useEffect } from "react"
import "../home.css"

const Url = 'http://localhost:3001'

const Home = () => {
    
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    fetch(URL + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(URL + "/todo/complete/" + id).then((res) =>
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
    const data = await fetch(URL + "/todo/new", {
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
    const data = await fetch(URL + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data.result._id));
  };
  
    return(


    
      <div className="main">
        <div className="create-todo">
          <form action="">
            <label htmlFor="name">Add Todo</label>
            {/* <input type="text" onChange={handleChange} /> */}

            <input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
            <div className="button" onClick={addTodo}>Create Task</div>

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
      </div>


      
      
          
      
    </div>

    )


}
 

export default Home