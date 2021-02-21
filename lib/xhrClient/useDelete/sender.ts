import { XHRDeleteClientProps } from "../xhr";
import { listeners, XHRResponse } from "../xhr/listeners";

const fetchSignature = (
  public_id: string
): Promise<{
  timestamp?: number;
  signature?: string;
  public_id?: string;
  error?: any;
}> =>
  new Promise((resolve, reject) => {
    fetch(`/api/delete-image?public_id=${public_id}`)
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

export const deleteImage = ({
  public_id,
  url,
}: XHRDeleteClientProps): Promise<XHRResponse> =>
  new Promise((resolve, reject) => {
    // get signature
    fetchSignature(public_id)
      .then(({ timestamp, public_id, signature }) => {
        const payload = new FormData();
        payload.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
        payload.append("public_id", public_id);
        payload.append("timestamp", timestamp.toString());
        payload.append("signature", signature);

        try {
          // XHR - New XHR request
          const xhr = new XMLHttpRequest();
          xhr.responseType = "json";

          listeners({ xhr, resolve, reject });

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
