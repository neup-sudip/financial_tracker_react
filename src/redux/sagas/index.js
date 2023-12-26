import { takeLatest, all } from "redux-saga/effects";
import { sagaActionTypes } from "./actions.js";
import { setUserProfile, handleLogout } from "./userSaga.js";

function* watchGeneralRequest() {
  yield takeLatest(sagaActionTypes.LOGOUT, handleLogout);
  yield takeLatest(sagaActionTypes.SET_USER_PROFILE, setUserProfile);
}

export default function* rootSaga() {
  yield all([watchGeneralRequest()]);
}
