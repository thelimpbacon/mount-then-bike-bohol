import { useCallback, useReducer } from "react";
import { reducer, initialState, dispatchType } from "./reducer";
import { createUploadClient } from "../xhr";
import { XHRResponse } from "../xhr/listeners";

interface UseUploadProps {
  url: string;
  onComplete?: (args: XHRResponse) => void;
  onError?: (args: XHRResponse) => void;
}

interface UploaderProps extends UseUploadProps {
  file: File | null;
  dispatch: dispatchType;
}

const uploader = async ({
  file,
  url,
  dispatch,
  onComplete,
  onError,
}: UploaderProps) => {
  dispatch({ type: "START_UPLOADING" });

  createUploadClient({
    file,
    onProgress: (progress: number) =>
      dispatch({ type: "SET_UPLOAD_PROGRESS", payload: progress }),
    url,
  })
    .then((response) => {
      if (onComplete) {
        onComplete(response);
      }
      dispatch({ type: "FINISH_UPLOADING", payload: response });
    })
    .catch((error) => {
      if (onError) {
        onError(error);
      }
      dispatch({ type: "SET_ERROR", payload: error });
    });
};

const useUpload = ({ onComplete, onError, url }: UseUploadProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const execute = useCallback((file: File) => {
    if (!file) return;

    uploader({ file, dispatch, onComplete, onError, url });
  }, []);

  return [{ ...state }, execute] as const;
};

export default useUpload;
