import React, {useState} from "react";
import {ITab} from "./App";
import './index.css'
import classNames from "classnames";
import {TiDelete} from "@react-icons/all-files/ti/TiDelete";

export const Tab = (props: {tab: ITab, index: number, activeIndex: number,
  onEdited: (newTabName: string, tabIndex: number) => void, onStatusChange: (tabIndex: number) => void,
  onDelete: (tabIndex: number) => void}) => {
  const [isEditingTab, setIsEditingTab] = useState(false)
  const [inputValue, setInputValue] = useState('')

  return (
    <div
      key={props.index.toString() + props.tab.title}
      id={`tab-${props.index.toString()}`}
      className={classNames("rounded-t-lg px-8 py-2 w-fit h-fit border-2 tab-item", {
        "border-b-0 border-primary" : props.index === props.activeIndex,
        "border-gray-300" : props.index !== props.activeIndex
      })}
      onDoubleClick={() => setIsEditingTab(true)}
      onClick={() => props.onStatusChange(props.index)}>
      {
        isEditingTab ?
          <input
              size={inputValue.length || props.tab.title.length}
            placeholder={props.tab.title || 'Tab' }
            autoFocus={true}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
            onBlur={() => {
              if (inputValue === '')
                if (props.tab.title === '')
                  props.onEdited('Tab', props.index)
                else
                  props.onEdited(props.tab.title, props.index)
              else
                props.onEdited(inputValue, props.index)
              setIsEditingTab(false)
            }}
            value={inputValue}/>
          :
          <label
            htmlFor={`tab-${props.index.toString()}`}>
            {props.tab.title}
          </label>
      }
      <TiDelete
        color='#E30000'
        onClick={() => props.onDelete(props.index)}
        className={'tab-delete absolute'}
      />
    </div>
  )
}