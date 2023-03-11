import React, {useEffect, useState} from 'react';
import { GrAdd } from '@react-icons/all-files/gr/GrAdd'
import "./index.css"
import {TodoItem} from "./TodoItem";
import {Tab} from "./Tab";


export interface ToDo {
  title: string;
  description: string;
  isDone: boolean;
}

export interface ITab {
  todos: ToDo[];
  title: string;
}


function App() {

  const [inputTitle, setInputTitle] = useState("")
  const [inputDescr, setInputDescr] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const [tabs, setTabs] = useState<ITab[]>(() => {
    const saved = localStorage.getItem("tabs")
    const initialValue = JSON.parse(saved!)
    return initialValue || [{todos: [], title: "Prova", isActive: true}]
  })
  /*const [todos, setTodos] = useState<ToDo[]>(() => {
    for (const tab of tabs) {
      if(tab.isActive) {
        return tab.todos
      }
    }
    if (tabs && tabs[0] && tabs[0].todos)
      return tabs[0].todos
    return []
  })*/

  const onTodoStatusChange = (todo: ToDo, index: number) => {
    const temp = [...tabs]
    temp[activeIndex].todos[index] = {...todo, isDone: !todo.isDone}
    setTabs(temp)
  }

  const onTodoDelete = (index: number) => {
    let temp = [...tabs]
    if (index === temp[activeIndex].todos.length)
      temp[activeIndex].todos = [...temp[activeIndex].todos.slice(0, index)]
    else if (index === 0)
      temp[activeIndex].todos = [...temp[activeIndex].todos.slice(1)]
    else
      temp[activeIndex].todos = [...temp[activeIndex].todos.slice(0, index), ...temp[activeIndex].todos.slice(index+1)]

    setTabs(temp)

  }

  const onTabStatusChange = (tabIndex: number) => {
    setActiveIndex(tabIndex)
  }

  const onTabEdited = (newTabName: string, tabIndex: number) => {
    const temp = [...tabs]
    temp[tabIndex] = {...temp[tabIndex], title: newTabName}
    setTabs(temp)
  }

  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs))
  })


  return (
    <div className="p-6 select-none">
      <div className="text-xl text-primary font-display font-bold uppercase">I miei ToDo</div>
      <form onSubmit={(event) => {
        event.preventDefault()
        if (inputTitle !== "") {
          const temp = [...tabs]
          temp[activeIndex].todos = [...temp[activeIndex].todos, {title: inputTitle, description: inputDescr, isDone: false}]
          setTabs(temp)
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
      <div className="block">
        <div className="mt-1 flex flex-row">
          {
            tabs.map((tab, index) => {
              return(
                <Tab
                  tab={tab}
                  index={index}
                  activeIndex={activeIndex}
                  onStatusChange={onTabStatusChange}
                  onEdited={onTabEdited}
                />
              )
            })


          }
          <div
              className="rounded-t-lg px-8 py-2 w-fit h-fit border-2 border-gray-300"
              onClick={() => {
                if(tabs.length < 8) {
                  const temp = [...tabs]
                  const newTab = {todos: [], title: "newTab", isActive: false}
                  setTabs([...temp, newTab])
                }
              }}
          >
            <GrAdd
                size={24}
                color={`${tabs.length < 8 ? `#000` : `#555`}`}
            />
          </div>
        </div>
        <div>
          {
            tabs[activeIndex].todos.map((todo, index) =>
              <TodoItem
                todo={todo}
                index={index}
                onStatusChange={onTodoStatusChange}
                onDelete={onTodoDelete}
              />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
