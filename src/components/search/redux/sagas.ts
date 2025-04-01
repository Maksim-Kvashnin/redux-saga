/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { debounce, put, retry, spawn, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  searchSkillsRequest,
  searchSkillsSuccess,
  searchSkillsFailure,
  setInitialState,
} from "./skillsSlice";

type SearchSkillsPayload = string;

interface Skill {
  id: number;
  name: string;
}

async function searchSkills(query: string): Promise<Skill[]> {
  const url = `${import.meta.env.VITE_URL_SEARCH}${query}`;
  const response = await axios.get(url);
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to fetch skills");
}

function* handleChangeSearchSaga(action: PayloadAction<SearchSkillsPayload>) {
  if (action.payload.trim() !== "") {
    yield put(searchSkillsRequest(action.payload));
  } else {
    yield put(setInitialState());
  }
}

function* handleSearchSkillsSaga(action: PayloadAction<SearchSkillsPayload>) {
  try {
    const count = 3;
    const delay = 1000;
    const data: Skill[] = yield retry(
      count,
      delay,
      searchSkills,
      action.payload
    );
    yield put(searchSkillsSuccess(data));
  } catch (error: any) {
    yield put(searchSkillsFailure(error?.message));
  }
}

function* watchChangeSearchSaga() {
  yield debounce(300, "skills/changeSearchField", handleChangeSearchSaga);
}

function* watchSearchSkillsSaga() {
  yield takeLatest("skills/searchSkillsRequest", handleSearchSkillsSaga);
}

export function* sagas() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillsSaga);
}