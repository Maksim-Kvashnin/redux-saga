/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { put, retry, spawn, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { setList, setItem, setError } from "./ListAndDetailsSlice";

interface ListItem {
  id: string;
  name: string;
  price: number;
  content?: string;
}

// Функция для проверки типа ListItem
function isListItem(data: any): data is ListItem {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    "name" in data &&
    "price" in data
  );
}

// Функция для проверки типа массива ListItem
function isListItemArray(data: any): data is ListItem[] {
  return Array.isArray(data) && data.every(isListItem);
}

function* handleGetItemSaga(
  action: PayloadAction<string>
): Generator<unknown, void, unknown> {
  try {
    const count = 3;
    const delay = 1000;
    const data: unknown = yield retry(
      count,
      delay,
      getListQuery,
      action.payload
    );

    // Проверка типа перед присвоением
    if (isListItem(data)) {
      yield put(setItem(data));
    } else {
      throw new Error("Полученные данные не соответствуют типу ListItem");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(setError(error.message));
    } else {
      yield put(setError("Произошла неизвестная ошибка"));
    }
  }
}

function* handleGetListSaga(): Generator<unknown, void, unknown> {
  try {
    const count = 3;
    const delay = 1000;
    const data: unknown = yield retry(count, delay, getListQuery);

    // Проверка типа перед присвоением
    if (isListItemArray(data)) {
      yield put(setList(data));
    } else {
      throw new Error("Полученные данные не соответствуют типу ListItem[]");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(setError(error.message));
    } else {
      yield put(setError("Произошла неизвестная ошибка"));
    }
  }
}

function* watchGetListSaga(): Generator<unknown, void, unknown> {
  yield takeLatest("LAD/getList", handleGetListSaga);
}

function* watchGetItemSaga(): Generator<unknown, void, unknown> {
  yield takeLatest("LAD/getItem", handleGetItemSaga);
}

export async function getListQuery(
  id?: string
): Promise<ListItem | ListItem[]> {
  let url = import.meta.env.VITE_URL_LIST;
  if (id) url = url + `/${id}`;
  const res = await axios.get(url);
  if (res.status === 200) {
    return res.data;
  }
  throw new Error("Failed to fetch data");
}

export function* sagas() {
  yield spawn(watchGetListSaga);
  yield spawn(watchGetItemSaga);
}