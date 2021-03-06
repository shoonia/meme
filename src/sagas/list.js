import {
  takeLatest,
  select,
  call,
  put,
} from 'redux-saga/effects';

import { LIST_GET_PAGE_BY_NUMBER } from '../constants';
import { fetchPageByNumber } from '../api';
import { receivePage, pageLoading } from '../actions/list';
import { selectCachePageByNumber } from '../selectors';
import { addPageToCache } from '../actions/cachePages';

export function* getPageByNumberSaga({ pageNumber }) {
  const page = yield select(selectCachePageByNumber(pageNumber));

  if (page) {
    yield put(receivePage(page));
    return;
  }

  yield put(pageLoading());

  try {
    const newPage = yield call(fetchPageByNumber, pageNumber);

    yield put(receivePage(newPage));
    yield put(addPageToCache({ [pageNumber]: newPage }));
  } catch (error) { /**/ }
}

export default function* () {
  yield takeLatest(LIST_GET_PAGE_BY_NUMBER, getPageByNumberSaga);
}
