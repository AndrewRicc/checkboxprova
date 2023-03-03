import React, {useEffect, useState} from 'react';
import "./index.css"


interface ToDo {
  title: string;
  description: string;
  isDone: boolean;
  isOver: boolean;
}

function App() {

  const [inputTitle, setInputTitle] = useState("")
  const [inputDescr, setInputDescr] = useState("")
  const [todos, setTodos] = useState<ToDo[]>(() => {
    const saved = localStorage.getItem("todos")
    const initialValue = JSON.parse(saved!)
    return initialValue || []
  })
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  })
  return (
      <div className="p-6">
        <div className="text-xl text-primary font-display font-bold uppercase select-none">I miei ToDo</div>
        <form onSubmit={(event) => {
          event.preventDefault()
          if (inputTitle !== "") {
            setTodos([...todos, {title: inputTitle, description: inputDescr, isDone: false, isOver: false}])
            setInputTitle("")
            setInputDescr("")
          }
        }}>
          <div className="grid">
            <div className="flex flex-row gap-x-3">
              <input
                  type="text"
                  className="block mt-2 rounded-2xl border-gray-300 shadow-sm focus:border-primary focus:ring-primary
                  sm:text-sm"
                  value={inputTitle}
                  onChange={
                    event => setInputTitle(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1))
                  }
                  placeholder="Titolo"
              />
              <div className="flex flex-row">
                <input
                    type="text"
                    className="block mt-2 w-72 rounded-2xl border-gray-300 shadow-sm focus:border-primary
                    focus:ring-primary
                  sm:text-sm"
                    value={inputDescr}
                    onChange={
                      event => setInputDescr(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1))
                    }
                    placeholder="Descrizione"
                />
                <button
                    className="bg-primary ml-3 px-8 py-3 sm:text-sm text-white rounded-xl shadow-sm hover:bg-opacity-90
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-opacity-30">
                  Aggiungi ToDo
                </button>
              </div>
            </div>
          </div>
        </form>
        <div>
          {
            todos.map((todo, index) => {
              return(
                <div
                  className={`bg-red-${((index+1)*100).toString()} w-fit relative flex items-start select-none`}
                  key={index.toString() + todo.title}
                  style={{textDecoration: todo.isDone ? "line-through" : "none"}}
                  onMouseOver={() => {
                    const temp = [...todos]
                    for (let i = 0; i < temp.length; i++) {
                      if(i !== index)
                        temp[i] = {...temp[i], isOver: false}
                    }
                    temp[index] = {...todo, isOver: true}
                    setTodos(temp)
                  }}
                  onMouseLeave={() => {
                    const temp = [...todos]
                    temp[index] = {...todo, isOver: false}
                    setTodos(temp)
                  }}
                  >
                  <div className="flex h-6 items-center">
                    <input
                      id={`check-${index.toString()}`}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      type="checkbox"
                      checked={todo.isDone}
                      onChange={() => {
                        const temp = [...todos]
                        temp[index] = {...todo, isDone: !todo.isDone}
                        setTodos(temp)
                      }}

                    />
                  </div>
                  <div className="flex flex-row">
                    <div className="ml-3">
                      <label
                        htmlFor={`check-${index.toString()}`}
                        className="text-sm font-medium leading-6 text-gray-900">
                      {index + 1} - {todo.title}
                      </label>
                      <p id="comments-description" className="text-sm font-medium leading-6 text-gray-500">
                        {todo.description}
                      </p>
                    </div>
                    <button
                      className="bg-primary ml-3 px-2 h-min sm:text-sm text-white rounded-xl shadow-sm hover:bg-opacity-90
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-opacity-30"
                      style={{display: todo.isOver ? "initial" : "none"}}
                      onClick={() => {
                        let temp
                        if (index === todos.length)
                          temp = [...todos.slice(0, index)]
                        else if (index === 0)
                          temp = [...todos.slice(1)]
                        else
                          temp = [...todos.slice(0, index), ...todos.slice(index+1)]

                        setTodos(temp)

                      }}
                    >
                      X
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
  );
}

export default App;
