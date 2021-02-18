import { useCallback, useRef, useState } from "react";
import cn from "classnames";
import s from "./ImageUploader.module.css";
import { UploadProgress } from "..";
import { RegisterOptions, useFormContext } from "react-hook-form";

// https://codingwithmanny.medium.com/build-a-react-drag-drop-progress-file-uploader-fb874c515a7

interface Props {
  name: string;
  rules?: RegisterOptions;
}

const ImageUploader = ({ name, rules }: Props) => {
  const [status, setStatus] = useState<string>("");
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState<number>(1);
  const { register, setValue, errors, getValues } = useFormContext();
  const imageRef = useRef<HTMLInputElement>(null);

  const onChange = useCallback(async (e) => {
    const supportedFilesTypes = ["image/jpeg", "image/png"];
    const { type } = e.target.files[0];

    if (supportedFilesTypes.indexOf(type) > -1) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(e.target.files[0]);

      // Create Form Data
      const payload = new FormData();
      const filename = encodeURIComponent(e.target.files[0].name);

      setStatus("Uploading");

      // fetch signature from api route
      const res = await fetch(`/api/signed-image-upload?file=${filename}`);
      const { timestamp, signature, public_id } = await res.json();

      payload.append("file", e.target.files[0]);
      payload.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      payload.append("public_id", public_id);
      payload.append("timestamp", timestamp);
      payload.append("signature", signature);

      // XHR - New XHR request
      const xhr = new XMLHttpRequest();
      xhr.responseType = "json";

      // XHR - Upload Progress listener
      xhr.upload.onprogress = (e) => {
        const done = e.loaded;
        const total = e.total;

        const percentDone = Math.floor((done / total) * 1000) / 10;
        if (percentDone >= 100) {
          setStatus("Done");
        } else {
          setStatus("Uploading");
        }

        setProgress(percentDone);
      };

      // XHR - Upload Finish listener
      xhr.onload = () => {
        if (xhr.status != 200) {
          setStatus("Error");
        } else {
          //use response
          // public_id, secure_url, original_filename
          setValue("mainImage.public_id", public_id);
          setValue("mainImage.url", xhr.response.secure_url, {
            shouldValidate: true,
          });
          setValue("mainImage.filename", filename);
        }

        setProgress(1);
      };

      // XHR - Upload Error listener
      xhr.onerror = () => {
        setStatus("Error");
        setProgress(1);
      };

      // XHR - Make request
      xhr.open(
        "POST",
        "https://api.cloudinary.com/v1_1/mount-then-bike-bohol/image/upload"
      );
      xhr.send(payload);
    }

    e.preventDefault();
  }, []);

  const deleteImage = useCallback(async () => {
    const public_id = getValues("mainImage.public_id");

    const res = await fetch(`/api/delete-image?public_id=${public_id}`);
    const { signature, timestamp } = await res.json();

    const payload = new FormData();

    payload.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    payload.append("public_id", public_id);
    payload.append("signature", signature);
    payload.append("timestamp", timestamp);

    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.onload = () => {
      if (xhr.status != 200) {
        setStatus("Error");
      } else {
        setValue("mainImage.public_id", "");
        setValue("mainImage.url", "", { shouldValidate: true });
        setValue("mainImage.filename", "");
        setPreview(null);
      }
    };

    // XHR - Make request
    xhr.open(
      "POST",
      "https://api.cloudinary.com/v1_1/mount-then-bike-bohol/image/destroy"
    );
    xhr.send(payload);
  }, []);

  return (
    <>
      <input name={`${name}.public_id`} ref={register({ ...rules })} hidden />
      <input name={`${name}.url`} ref={register({ ...rules })} hidden />
      <input name={`${name}.filename`} ref={register({ ...rules })} hidden />
      <input type="file" onChange={onChange} hidden ref={imageRef} />

      <div className={s.root}>
        <div
          className={cn("flex items-center justify-center w-3/4 lg:w-1/4", {
            hidden: preview,
          })}
          onClick={() => imageRef.current.click()}
        >
          <label className="flex flex-col items-center w-full py-6 bg-white border border-blue-200 rounded-lg shadow-lg cursor-pointer text-blue hover:bg-blue-400 hover:text-white">
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <span className="mt-2 text-xs lg:text-base">Upload image</span>
          </label>
        </div>
        <div className="relative h-full">
          {status === "Uploading" && (
            <>
              <UploadProgress progress={progress} />
              <div
                className={cn("absolute inset-0", {
                  "bg-blue-200 bg-opacity-50": status === "Uploading",
                })}
              ></div>
            </>
          )}

          <img
            className="object-contain w-auto h-full rounded-md"
            src={preview}
            style={{
              filter:
                status === "Uploading" || status === "Error" ? "blur(5px)" : "",
            }}
          />

          {preview && (
            <div
              className="absolute top-0 right-0 z-20 p-0.5 bg-white cursor-pointer"
              onClick={deleteImage}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageUploader;
