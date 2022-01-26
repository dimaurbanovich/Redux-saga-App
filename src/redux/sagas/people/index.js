import { LOCATION_CHANGE } from "connected-react-router";
import { matchPath } from "react-router";
import {
  call,
  apply,
  takeEvery,
  put,
  take,
  select,
  fork,
} from "redux-saga/effects";
import {
  getRouteConfig,
  MAIN_ROUTE,
  PEOPLE_DETAILS_ROUTE,
} from "../../../routes";
import {
  LOAD_PEOPLE,
  LOAD_PEOPLE_SUCCESS,
} from "../../reducers/people/actions";
import { selectPeople } from "../../reducers/people/selectors";
import {
  LOAD_PEOPLE_DETAILS,
  LOAD_PEOPLE_DETAILS_FAILURE,
  LOAD_PEOPLE_DETAILS_SUCCESS,
} from "../../reducers/peopleDetails/actions";

export function* loadPeopleDetails({ payload }) {
  const { id } = payload;

  try {
    const request = yield call(fetch, `https://swapi.dev/api/people/${id}`);
    const data = yield apply(request, request.json);

    yield put({ type: LOAD_PEOPLE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: LOAD_PEOPLE_DETAILS_FAILURE, payload: error });
  }
}

export function* loadPeopleList({ payload }) {
  const { page, search } = payload;
  const request = yield call(
    fetch,
    `https://swapi.dev/api/people?page=${page}&search=${search}`
  );
  const data = yield apply(request, request.json);

  yield put({ type: LOAD_PEOPLE_SUCCESS, payload: data });
}

export function* routeChangeSaga() {
  while (true) {
    const action = yield take(LOCATION_CHANGE);

    if (
      matchPath(action.payload.location.pathname, getRouteConfig(MAIN_ROUTE))
    ) {
      const state = yield select(selectPeople);

      const { page, search } = state;

      yield put({
        type: LOAD_PEOPLE,
        payload: {
          page,
          search,
        },
      });
    }

    const detailsPage = matchPath(
      action.payload.location.pathname,
      getRouteConfig(PEOPLE_DETAILS_ROUTE)
    );

    if (detailsPage) {
      const { id } = detailsPage.params;

      if (id) {
        yield put({
          type: LOAD_PEOPLE_DETAILS,
          payload: {
            id,
          },
        });
      }
    }
  }
}

export default function* peopleSaga() {
  yield fork(routeChangeSaga);
  yield takeEvery(LOAD_PEOPLE, loadPeopleList);
  yield takeEvery(LOAD_PEOPLE_DETAILS, loadPeopleDetails);
}
