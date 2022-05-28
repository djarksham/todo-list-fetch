import React, { useEffect, useState } from "react";
import { isEmpty, size } from "lodash";

const url = "http://assets.breatheco.de/apis/fake/todos/user/luis";

function App() {

  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(data => setTodos(data))
  }, [])

  const addTask = (e) => {
    e.preventDefault();
    if (isEmpty(task)) {
      console.log("tarea esta vacia");
      return;
    }
    setTodos([...todos, { label: "" + task + "", done: false }]);
    console.log(todos);
    fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...todos, { label: "" + task + "", done: false }])
    }).then((res) => { return res.json() })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
      setTask("");
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((todos, index) => index !== id));
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todos.filter((todos, index) => index !== id))
    }).then((res) => { return res.json() })
     .then((data) => console.log(data))
     .catch((error) => console.log(error))
  };

  return (
    <div className="container-lg">
      <h1>Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          { 
          size(todos) == 0 ? (
            <h5 className="text-center">No hay tareas, añadir tareas</h5>
          ) :  (
                <ul className="list-group">
                  {todos.map((todos , index) => {
                    return <li className="list-group-item" key= {index}>
                    <span className="lead">{todos.label}</span>
                    <button className="btn btn-danger btn-primary btn-sm float-end"
                      onClick={() => deleteTask(index)}>
                      Eliminar
                    </button>
                  </li>
                  })}
                </ul>
                )
          }
        </div>
        <div className="col-4">
          <h4 className="text-center">Formulario</h4>
          <div className="d-grid gap-2">
            <form onSubmit={addTask}>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="ingrese la tarea..."
                onChange={(text) => setTask(text.target.value)}
                value={task}
              >
              </input>
              <div className="d-grid gap-2">
                <button className="btn btn-dark btn-primary"
                  type="submit">
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
