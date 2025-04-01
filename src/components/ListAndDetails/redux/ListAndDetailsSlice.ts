/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type listItem = {
    id: string
    name: string
    price: number
    content?: string
}

export interface LAD {
    list: listItem[]
    item: listItem | null
    load: boolean
    error?: string | null
}

const initialState: LAD = {
    list: [],
    item: null,
    load: false
}

export const LADSlice = createSlice({
  name: 'LAD',
  initialState,
  reducers: {
    getList: (state) => {
      state.load = true
    },
    setList: (state, action: PayloadAction<listItem[]>) => {
        state.list = action.payload
        state.load = false
        state.error = null
    },
    getItem: (state, _action: PayloadAction<string>) => {
        state.load = true
    },
    setItem: (state, action: PayloadAction<listItem>) => {
        state.item = action.payload
        state.load = false
        state.error = null
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.load = false
    },
  },
})

export const { getList, setList, getItem, setItem, setError } = LADSlice.actions
export default LADSlice.reducer
