export const sagaActionTypes = {
  SET_USER_PROFILE: "SET_USER_PROFILE",
  LOGOUT: "LOGOUT",
};

export const SET_USER_PROFILE = (data) => ({
  type: sagaActionTypes.SET_USER_PROFILE,
  payload: data,
});

export const LOGOUT = () => ({
  type: sagaActionTypes.LOGOUT,
  payload: null,
});
