interface ListenerProps {
  xhr: XMLHttpRequest;
  onProgress?: (progress: number) => void;
  resolve: (args: XHRResponse) => void;
  reject: (args: XHRResponse) => void;
}

export interface CloudinaryUploadResponse {
  asset_id: string;
  bytes: number;
  created_at: string;
  etag: string;
  format: string;
  height: number;
  original_filename: string;
  placeholder: false;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: Array<string>;
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
  result: "ok" | "not found"; // this is for destory
}

export type XHRResponse = {
  response?: CloudinaryUploadResponse | null;
  error?: string | boolean | ProgressEvent;
  statusCode: number;
  done?: boolean;
};

export const listeners = ({
  xhr,
  onProgress,
  resolve,
  reject,
}: ListenerProps) => {
  if (onProgress) {
    xhr.upload.addEventListener("progress", (e) => {
      if (!onProgress) return false;
      onProgress(Math.round((e.loaded / e.total) * 100));
    });
  }

  xhr.addEventListener("load", () => {
    if (xhr.status != 200) {
      reject({
        error: true,
        statusCode: xhr.status,
        response: xhr.response,
      });
    } else {
      resolve({
        response: xhr.response,
        statusCode: xhr.status,
        error: false,
        done: true,
      });
    }
  });

  xhr.addEventListener("error", (error) => {
    reject({
      error,
      statusCode: xhr.status,
      response: null,
    });
  });
};
