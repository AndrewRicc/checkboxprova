import {GrAdd} from "@react-icons/all-files/gr/GrAdd";
import React from "react";

export const AddTab = (props: {iconSize: number, iconColor: string, onAddTab: () => void}) => {
  return(
    <div
      className="rounded-t-lg px-8 py-2 w-fit h-fit border-2 border-gray-300"
      onClick={props.onAddTab}
    >
      <GrAdd
        size={props.iconSize}
        color={props.iconColor}
      />
    </div>
  )
}