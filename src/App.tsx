import React, {useEffect, useState} from 'react';
import "./index.css"
import { TodoItem } from "./TodoItem";
import { TabContainer } from "./TabContainer";
import {InputForm, TodoInputFormValues} from "./InputForm";
import {AddTab} from "./AddTab";
import {useDispatch, useSelector} from "react-redux";
import {createTodo, deleteTodo, editTodo} from "./store/slices/todo.slice";
import { v4 as uuidv4 } from 'uuid'
import {RootState} from "./store";
import {createTab, deleteTab, editTab} from "./store/slices/tab.slice";


export interface ToDo {
  title: string;
  description: string;
  isDone: boolean;
  id: string;
  tabId: string;
}

export interface ITab {
  title: string;
  id: string;
}


function App() {

  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todos.entities)
  const tabs = useSelector((state: RootState) => state.tab.entities)

  const [activeIndex, setActiveIndex] = useState(0)
  /*const [tabs, setTabs] = useState<ITab[]>(() => {
    const saved = localStorage.getItem("tabs")
    const initialValue = JSON.parse(saved!)
    return initialValue || [{todos: [], title: "Prova", isActive: true}]
  })*/

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

  /*const onTodoStatusChange = (todo: ToDo, index: number) => {
    const temp = [...tabs]
    temp[activeIndex].todos[index] = {...todo, isDone: !todo.isDone}
    setTabs(temp)
  }*/

  /*const onTodoDelete = (index: number) => {
    let temp = [...tabs]
    if (index === temp[activeIndex].todos.length)
      temp[activeIndex].todos = [...temp[activeIndex].todos.slice(0, index)]
    else if (index === 0)
      temp[activeIndex].todos = [...temp[activeIndex].todos.slice(1)]
    else
      temp[activeIndex].todos = [...temp[activeIndex].todos.slice(0, index), ...temp[activeIndex].todos.slice(index + 1)]

    setTabs(temp)
  }*/

  const onTabStatusChange = (tabIndex: number) => {
    setActiveIndex(tabIndex)
  }

  /*const onEmptyTabsAdd = () => {
    setTabs([{todos: [], title: "newTab"}])
    setActiveIndex(0)
  }*/

  const onFormSubmit = (values: TodoInputFormValues) => {
    if (values.title !== "") {
      dispatch(createTodo({...values, id: uuidv4(), tabId:'1', isDone: false}))
    }
  }

  /*const onTitleChange = (event: any) => {
    setInputTitle(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1))
  }

  const onDescrChange = (event: any) => {
    setInputDescr(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1))
  }*/


  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs))
  })


  return (
    <div className="p-6 select-none">
      <InputForm
        disabled={Object.values(tabs).length === 0}
        title={'I miei todo'}
        onFormSubmit={onFormSubmit}
        buttonTitle={"Aggiungi ToDo"}
      />
      <div className="block">
        {
          Object.values(tabs).length > 0 ?
          <>
            <TabContainer
              tabs={Object.values(tabs) as ITab[]}
              activeIndex={activeIndex}
              onStatusChange={onTabStatusChange}
              iconSize={24}
              iconColor={`${Object.values(tabs).length < 8 ? `#000` : `#d7d7d7`}`}
              onAddTab={(newTab) => dispatch(createTab(newTab))}
              onEdited={(newTab) => dispatch(editTab(newTab))}
              onDelete={(tabId) => dispatch(deleteTab(tabId))}
            />
            <div>
              {
                Object.values(todos).map((todo, index) =>
                  <TodoItem
                    todo={todo!}
                    index={index}
                    onStatusChange={(todo) => {
                      dispatch(editTodo({...todo, isDone: !todo.isDone}))
                    }}
                    onDelete={(id) => {
                      dispatch(deleteTodo(id))
                    }}
                  />
                )
              }
            </div>
          </>
              :
          <AddTab
            iconSize={24}
            iconColor={`${Object.values(tabs).length < 8 ? `#000` : `#d7d7d7`}`}
            onAddTab={(values: ITab) => dispatch(createTab(values))}
          />
        }
      </div>
    </div>
  );
}

export default App;
