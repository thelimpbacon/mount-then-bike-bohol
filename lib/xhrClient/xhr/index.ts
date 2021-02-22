import { XHRResponse } from "./listeners";
import { uploadImage } from "../useUpload/sender";
import { deleteImage } from "../useDelete/sender";

export interface XHRClientProps {
  file: File;
  onProgress: (progress: number) => void;
  url: string;
}

export interface XHRDeleteClientProps {
  url: string;
  public_id: string;
}

export const createUploadClient = async ({
  file,
  onProgress,
  url,
}: XHRClientProps): Promise<XHRResponse> => {
  return uploadImage({
    url,
    file,
    onProgress,
  });
};

export const createDeleteClient = async ({
  url,
  public_id,
}: XHRDeleteClientProps): Promise<XHRResponse> => {
  return deleteImage({
    url,
    public_id,
  });
};
