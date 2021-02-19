import { useState, useCallback } from "react";

const imageDelete = async (public_id: string) => {
  const res = await fetch(`/api/delete-image?public_id=${public_id}`);
  const { signature, timestamp } = await res.json();

  return new Promise<any>((resolve, reject) => {
    const payload = new FormData();
    payload.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    payload.append("public_id", public_id);
    payload.append("signature", signature);
    payload.append("timestamp", timestamp);

    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.onload = () => {
      if (xhr.status != 200) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject(xhr.response);
    };

    xhr.open(
      "POST",
      "https://api.cloudinary.com/v1_1/mount-then-bike-bohol/image/destroy"
    );

    xhr.send(payload);
  });
};

const useDelete = () => {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState<any | null>(null);

  const execute = useCallback(
    async (public_id: string) => {
      setStatus("pending");
      setValue(null);
      setError(null);

      try {
        const response = await imageDelete(public_id);
        setValue(response);
        setStatus("success");
      } catch (error) {
        setError(error);
        setStatus("error");
      }
    },
    [imageDelete]
  );

  return { status, value, error, execute };
};

export default useDelete;
