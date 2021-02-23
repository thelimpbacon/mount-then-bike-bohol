import { useCallback, useRef, useState } from "react";
import cn from "classnames";
import { UploadProgress } from "..";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { useDelete, useUpload } from "@lib/xhrClient";
import s from "./ImageUploader.module.css";

interface ImageUploaderProps {
  name: string;
  rules?: RegisterOptions;
  defaultValue?: string;
}

const ImageUploader = ({ name, rules, defaultValue }: ImageUploaderProps) => {
  const [preview, setPreview] = useState(null);
  const { register, setValue, getValues } = useFormContext();
  const imageRef = useRef<HTMLInputElement>(null);

  const [
    { error: uploadError, done: uploadDone, progress, loading: uploadLoading },
    uploadImage,
  ] = useUpload({
    url: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL,
    onComplete: ({ response }) => {
      //set value for form
      setValue(`${name}.public_id`, response.public_id);
      setValue(`${name}.url`, response.secure_url, {
        shouldValidate: true,
      });
      setValue(`${name}.filename`, response.original_filename);
    },
    onError: ({ error }) => {
      console.error("error:", error);
      setPreview(null);
    },
  });

  const [{ loading: deleteLoading }, deleteImage] = useDelete({
    url: process.env.NEXT_PUBLIC_CLOUDINARY_DESTROY_URL,
    onComplete: () => {
      setValue(`${name}.public_id`, "");
      setValue(`${name}.url`, "", {
        shouldValidate: true,
      });
      setValue(`${name}.filename`, "");
      imageRef.current.value = "";
      setPreview(null);
    },
    onError: ({ response }) => {
      imageRef.current.value = "";
      console.log("delete error:", response);
    },
  });

  const handleFileChange = useCallback((e) => {
    uploadImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(e.target.files[0]);
    e.preventDefault();
  }, []);

  const handleDeleteImage = useCallback(() => {
    deleteImage(getValues(`${name}.public_id`));
  }, []);

  return (
    <>
      <input
        name={`${name}.public_id`}
        ref={register({ ...rules })}
        hidden
        defaultValue={defaultValue}
      />
      <input
        name={`${name}.url`}
        ref={register({ ...rules })}
        hidden
        defaultValue={defaultValue}
      />
      <input
        name={`${name}.filename`}
        ref={register({ ...rules })}
        hidden
        defaultValue={defaultValue}
      />
      <input type="file" hidden ref={imageRef} onChange={handleFileChange} />

      <div className={s.root}>
        <div
          className={cn("flex items-center justify-center w-3/4 lg:w-1/2", {
            hidden: preview,
          })}
          onClick={() => imageRef.current.click()}
        >
          <div className={s.buttonContainer}>
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
          </div>
        </div>
        <div className="relative h-full">
          {uploadLoading && (
            <>
              <UploadProgress progress={progress} />
              <div
                className={cn("absolute inset-0", {
                  "bg-blue-200 bg-opacity-50": !uploadLoading,
                })}
              ></div>
            </>
          )}

          {preview && (
            <img
              className="object-contain w-auto h-full rounded-md"
              src={preview}
              style={{
                filter: uploadLoading || deleteLoading ? "blur(5px)" : "",
              }}
            />
          )}

          {!uploadError && uploadDone && preview && (
            <div
              className="absolute top-0 right-0 z-20 p-0.5 bg-white cursor-pointer"
              onClick={handleDeleteImage}
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
