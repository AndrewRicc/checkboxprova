import React, {useEffect, useState} from 'react';
import "./index.css"
import { TodoItem } from "./TodoItem";
import { TabContainer } from "./TabContainer";
import { InputForm } from "./InputForm";
import {AddTab} from "./AddTab";


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

  const onTabAdd = () => {
    if (tabs.length < 8) {
      const temp = [...tabs]
      const newTab = {todos: [], title: "newTab"}
      setTabs([...temp, newTab])
    }
  }

  const onEmptyTabsAdd = () => {
    setTabs([{todos: [], title: "newTab"}])
    setActiveIndex(0)
  }

  const onTabEdited = (newTabName: string, tabIndex: number) => {
    const temp = [...tabs]
    temp[tabIndex] = {...temp[tabIndex], title: newTabName}
    setTabs(temp)
  }

  const onFormSubmit = (event: any) => {
    event.preventDefault()
    if (inputTitle !== "") {
      const temp = [...tabs]
      temp[activeIndex].todos = [...temp[activeIndex].todos, {title: inputTitle, description: inputDescr, isDone: false}]
      setTabs(temp)
      setInputTitle("")
      setInputDescr("")
    }
  }

  const onTitleChange = (event: any) => {
    setInputTitle(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1))
  }

  const onDescrChange = (event: any) => {
    setInputDescr(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1))
  }

  const onTabDelete = (index: number) => {
    let temp = [...tabs]

    if (activeIndex === temp.length-1) {
      setActiveIndex(activeIndex - 1)
    }

    if (index === 0 && index === temp.length)
      temp = []
    if (index === temp.length)
      temp = temp.slice(0, index)
    else if (index === 0)
      temp = temp.slice(1)
    else
      temp = [...temp.slice(0, index), ...temp.slice(index+1)]

    setTabs(temp)
  }

  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs))
  })


  return (
    <div className="p-6 select-none">
      <InputForm
        disabled={tabs.length === 0}
        title={'I miei todo'}
        onFormSubmit={onFormSubmit}
        titleValue={inputTitle}
        onTitleChange={onTitleChange}
        descrValue={inputDescr}
        onDescrChange={onDescrChange}
        buttonTitle={"Aggiungi ToDo"}
      />
      <div className="block">
        {
          tabs.length > 0 ?
          <>
            <TabContainer
              tabs={tabs}
              activeIndex={activeIndex}
              onStatusChange={onTabStatusChange}
              onEdited={onTabEdited}
              onAddTab={onTabAdd}
              iconSize={24}
              iconColor={`${tabs.length < 8 ? `#000` : `#d7d7d7`}`}
              onDelete={onTabDelete}
            />
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
          </>
              :
          <AddTab
          onAddTab={onEmptyTabsAdd}
          iconSize={24}
          iconColor={`${tabs.length < 8 ? `#000` : `#d7d7d7`}`}
          />
        }
      </div>
    </div>
  );
}

export default App;
