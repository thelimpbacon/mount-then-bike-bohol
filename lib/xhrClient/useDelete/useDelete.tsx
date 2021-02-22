import { useCallback, useReducer } from "react";
import { createDeleteClient } from "../xhr";
import { XHRResponse } from "../xhr/listeners";
import { dispatchType, initialState, reducer } from "./reducer";

interface UseDeleteProps {
  url: string;
  onComplete?: (args: XHRResponse) => void;
  onError?: (args: XHRResponse) => void;
}

interface DeleterProps extends UseDeleteProps {
  public_id: string;
  dispatch: dispatchType;
}

const deleter = async ({
  public_id,
  dispatch,
  url,
  onComplete,
  onError,
}: DeleterProps) => {
  dispatch({ type: "START_DELETING" });

  createDeleteClient({ public_id, url })
    .then((response) => {
      if (onComplete) {
        onComplete(response);
      }
      dispatch({ type: "FINISH_DELETING", payload: response });
    })
    .catch((error) => {
      if (onError) {
        onError(error);
        dispatch({ type: "SET_ERROR", payload: error });
      }
    });
};

const useDelete = ({ onComplete, onError, url }: UseDeleteProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const execute = useCallback((public_id: string) => {
    if (!public_id) return;

    deleter({ public_id, dispatch, url, onComplete, onError });
  }, []);

  return [{ ...state }, execute] as const;
};

export default useDelete;
