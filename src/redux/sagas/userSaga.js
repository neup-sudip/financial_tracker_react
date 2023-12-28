import { put } from "redux-saga/effects";
import { setProfile } from "../features/user.js";

export function* setUserProfile({ payload }) {
  try {
    yield put(setProfile(payload));
  } catch (error) {
    console.log(error);
    yield put(setProfile({ data: null }));
  }
}

export function* handleLogout() {
  try {
    yield put(setProfile(null));
  } catch (error) {
    console.log(error);
  }
}
