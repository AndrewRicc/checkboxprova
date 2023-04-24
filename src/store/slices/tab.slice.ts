import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ITab } from "../../App";
import { v4 as uuidv4 } from 'uuid'

const tabsAdapter = createEntityAdapter<ITab>({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
})

const emptyInitialState = tabsAdapter.getInitialState();
const filledState = tabsAdapter.upsertMany(emptyInitialState, [{title: "Prova", id: uuidv4()}])


export const tabSlice = createSlice({
  name: 'tab',
  initialState: filledState,
  reducers: {
    createTab: tabsAdapter.addOne,
    createManyTab: tabsAdapter.addMany,
    editTab: tabsAdapter.setOne,
    deleteTab: tabsAdapter.removeOne,
    deleteManyTab: tabsAdapter.removeMany,
  }
});

export const {
  createTab,
  createManyTab,
  editTab,
  deleteTab,
  deleteManyTab,
} = tabSlice.actions

export default tabSlice.reducer