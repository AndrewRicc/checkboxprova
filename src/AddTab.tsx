import {GrAdd} from "@react-icons/all-files/gr/GrAdd";
import React from "react";
import {ITab} from "./App";
import {v4 as uuidv4} from "uuid";

export const AddTab = (props: {iconSize: number, iconColor: string, onAddTab: (values: ITab) => void}) => {
  return(
    <div
      className="rounded-t-lg px-8 py-2 w-fit h-fit border-2 border-gray-300"
      onClick={() => props.onAddTab({title: "newTab", id: uuidv4()})}
    >
      <GrAdd
        size={props.iconSize}
        color={props.iconColor}
      />
    </div>
  )
}