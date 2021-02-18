import React from "react";

interface UploadProgressProps {
  progress: number;
}

const UploadProgress = ({ progress }: UploadProgressProps) => {
  return (
    <div className="absolute inset-0 z-10 items-center">
      <div className="absolute bottom-0 flex w-full h-2 overflow-hidden text-xs bg-blue-200 rounded">
        <div
          style={{ width: `${progress}%` }}
          className="flex flex-col justify-center text-center text-white bg-blue-500 shadow-none whitespace-nowrap"
        ></div>
      </div>
    </div>
  );
};

export default UploadProgress;
