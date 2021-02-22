import { listeners, XHRResponse } from "../xhr/listeners";

interface UploadProps {
  url: string;
  file: File;
  onProgress: (progress: number) => void;
}

const fetchSignature = (
  filename: string
): Promise<{
  timestamp?: number;
  signature?: string;
  public_id?: string;
  error?: any;
}> =>
  new Promise((resolve, reject) => {
    fetch(`/api/signed-image-upload?file=${filename}`)
      .then((res) => res.json())
      .then((res) =>
        resolve({
          timestamp: res.timestamp,
          signature: res.signature,
          public_id: res.public_id,
        })
      )
      .catch((error) => {
        reject({ error });
      });
  });

export const uploadImage = ({
  url,
  file,
  onProgress,
}: UploadProps): Promise<XHRResponse> =>
  new Promise((resolve, reject) => {
    // get signature
    const filename = encodeURIComponent(file.name);

    fetchSignature(filename)
      .then(({ timestamp, signature, public_id }) => {
        const payload = new FormData();
        payload.append("file", file);
        payload.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
        payload.append("public_id", public_id);
        payload.append("timestamp", timestamp.toString());
        payload.append("signature", signature);

        try {
          // XHR - New XHR request
          const xhr = new XMLHttpRequest();
          xhr.responseType = "json";

          listeners({ xhr, onProgress, resolve, reject });

          // XHR - Make request
          xhr.open("POST", url);
          xhr.send(payload);
        } catch (error) {
          reject({ error });
        }
      })
      .catch((error) => {
        reject({ error });
      });
  });
