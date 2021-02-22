import { XHRResponse } from "../xhr/listeners";

export const SET_ERROR = "SET_ERROR";
export const START_DELETING = "START_DELETING";
export const FINISH_DELETING = "FINISH_DELETING";
export const RESET = "RESET";

export type DeleteState = {
  loading: boolean;
  error: string | null;
  done: boolean;
  response?: XHRResponse;
};

export const initialState: DeleteState = {
  loading: false,
  error: null,
  done: false,
  response: null,
};

export type Action =
  | { type: "START_DELETING" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "FINISH_DELETING"; payload: any }
  | { type: "RESET" };

export type dispatchType = (action: Action) => void;

export function reducer(state: DeleteState, action: Action): DeleteState {
  switch (action.type) {
    case START_DELETING:
      return { ...initialState, loading: true };
    case SET_ERROR:
      return { ...state, loading: false, error: action.payload, done: true };
    case FINISH_DELETING:
      return {
        ...state,
        done: true,
        loading: false,
        response: action.payload,
        error: action.payload.error ? action.payload.response : false,
      };
    case RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
