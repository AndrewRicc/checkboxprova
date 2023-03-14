import React from "react";

export const InputForm = (props: {disabled: boolean, title: string, onFormSubmit: (event: any) => void, titleValue: string,
  onTitleChange: (event: any) => void, descrValue: string, onDescrChange: (event: any) => void, buttonTitle: string}) => {
  return (
    <>
      <div className="text-xl text-primary font-display font-bold uppercase">{props.title}</div>
      <form onSubmit={(event) => props.onFormSubmit(event)}>
        <div className="grid">
          <div className="flex flex-row gap-x-3">
            <input
              disabled={props.disabled}
              type="text"
              className="block mt-2 rounded-2xl border-gray-300 shadow-sm focus:border-primary focus:ring-primary
              sm:text-sm"
              value={props.titleValue}
              onChange={(event) => props.onTitleChange(event)}
              placeholder="Titolo"
            />
            <div className="flex flex-row">
              <input
                disabled={props.disabled}
                type="text"
                className="block mt-2 w-72 rounded-2xl border-gray-300 shadow-sm focus:border-primary
                focus:ring-primary sm:text-sm"
                  value={props.descrValue}
                  onChange={(event) => props.onDescrChange(event)}
                  placeholder="Descrizione"
              />
              <button
                disabled={props.disabled}
                className="bg-primary ml-3 px-8 py-3 sm:text-sm text-white rounded-xl shadow-sm hover:bg-opacity-90
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-opacity-30">
                {props.buttonTitle}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}