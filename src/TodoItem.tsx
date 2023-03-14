import {ToDo} from "./App";
import {TiDelete} from "@react-icons/all-files/ti/TiDelete";
import './index.css'
import React from "react";
import classNames from "classnames";

export const TodoItem = (props: {todo: ToDo, index: number, onStatusChange: (todo: ToDo, index: number) => void, onDelete: (index: number) => void}) => {

  return (
    <div
      className={classNames(`w-fit relative flex items-start todo-item`, {
        'line-through' : props.todo.isDone
      })}
      key={props.index.toString() + props.todo.title}>

      <div className="flex h-6 items-center">
        <input
          id={`check-${props.index.toString()}`}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          type="checkbox"
          checked={props.todo.isDone}
          onChange={() => props.onStatusChange(props.todo, props.index)}
        />
      </div>
      <div className="flex flex-row">
        <div className="ml-3">
          <label
            htmlFor={`check-${props.index.toString()}`}
            className="text-sm font-medium leading-6 text-gray-900">
            {props.index + 1} - {props.todo.title}
          </label>
          <p id="comments-description" className="text-sm font-medium leading-6 text-gray-500">
            {props.todo.description}
          </p>
        </div>
        <TiDelete
          color='#E30000'
          onClick={() => props.onDelete(props.index)}
          className={'todo-delete'}
        />
      </div>
    </div>
  )

}