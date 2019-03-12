import * as types from "./actionTypes";

export function setLoading(status) {
  return { type: types.SET_LOADING, loading: status };
}
