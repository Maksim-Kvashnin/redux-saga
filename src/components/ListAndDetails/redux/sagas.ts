/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { put, retry, spawn, takeLatest } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { setList, setItem, setError } from "./ListAndDetailsSlice";

function* handleGetItemSaga(action: PayloadAction<string>) {    
    try {
        const count = 3;
        const delay = 1000;        
        const data = yield retry(count, delay, getListQuery, action.payload);
        yield put(setItem(data))
    } catch (error: any) {
        yield put(setError(error?.message))
    }   
}

function* handleGetListSaga() {
    try {
        const count = 3;
        const delay = 1000;        
        const data = yield retry(count, delay, getListQuery);
        yield put(setList(data))
    } catch (error: any) {
        yield put(setError(error?.message))
    }
}

function* watchGetListSaga() {
    yield takeLatest("LAD/getList", handleGetListSaga)
}

function* watchGetItemSaga() {
    yield takeLatest("LAD/getItem", handleGetItemSaga)
}

export async function getListQuery(id?: string) {
    let url = import.meta.env.VITE_URL_LIST;
    if(id) url = url + `/${id}`    
    return await axios.get(url).then(res => {                
                        if(res.status === 200) {                            
                            return res.data
                        }
                    })    
}

export function* sagas() {
    yield spawn(watchGetListSaga);
    yield spawn(watchGetItemSaga);
}