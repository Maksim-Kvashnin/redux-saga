/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type skill = {
    id: number,
    name: string
}

export interface CounterState {
    load: boolean
    list: skill[]
    error?: string | unknown
    query?: string
}

const initialState: CounterState = {
    load: false,
    list: [],
    query: ''
}

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    changeSearchField: (state, action: PayloadAction<string>) => {        
        state.query = action.payload
    },
    searchSkillsRequest: (state, _action: PayloadAction<string>) => {
        state.load = true
    },
    searchSkillsFailure: (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.load = false
    },
    searchSkillsSuccess: (state, action: PayloadAction<skill[]>) => {
        state.list = action.payload
        state.load = false
    },
    setInitialState: (state) => {
        state.list = []
        state.query = ''
    },
  },
})

export const { searchSkillsRequest, searchSkillsSuccess, searchSkillsFailure, changeSearchField, setInitialState } = skillsSlice.actions
export default skillsSlice.reducer