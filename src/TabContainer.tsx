import {ITab} from "./App";
import {Tab} from "./Tab";
import React from "react";
import {AddTab} from "./AddTab";

export const TabContainer = (props: {tabs: ITab[], activeIndex: number, onStatusChange: (tabIndex: number) => void,
  onEdited: (newTab: ITab) => void, onAddTab: (newTab: ITab) => void, iconSize: number, iconColor: string,
  onDelete: (tabId: string) => void}) => {
  return (
    <div className="mt-1 flex flex-row">
      {
        props.tabs.map((tab, index) => {
          return (
            <Tab
              tab={tab}
              index={index}
              activeIndex={props.activeIndex}
              onStatusChange={props.onStatusChange}
              onEdited={props.onEdited}
              onDelete={props.onDelete}
            />
          )
        })
      }
      <AddTab
        onAddTab={props.onAddTab}
        iconSize={props.iconSize}
        iconColor={props.iconColor}
      />
    </div>
  )
}