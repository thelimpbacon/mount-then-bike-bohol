import Dropzone from "react-dropzone-uploader";

interface ImageUploaderProps {
  className?: string;
}

const ImageUploader = (props: ImageUploaderProps) => {
  const upload = async ({ file, meta }) => {
    const formData = new FormData();
    const filename = encodeURIComponent(file.name);

    const res = await fetch(`/api/signed-image-upload?file=${filename}`);

    const { timestamp, signature, public_id } = await res.json();

    formData.append("file", file);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    formData.append("public_id", public_id);
    // formData.append("eager", "w_400,h_300,c_pad|w_260,h_200,c_crop");
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    return {
      url: "https://api.cloudinary.com/v1_1/mount-then-bike-bohol/image/upload",
      body: formData,
    };
  };

  const handleChangeStatus = (file, status) => {
    // sample xhr
    //     asset_id: "e1cf3514280216269499a0bd5ab1e0f0"
    // bytes: 112002
    // created_at: "2021-02-14T13:57:23Z"
    // etag: "232bf5e5f6c6333f61ded3d0cbf3766d"
    // format: "jpg"
    // height: 1025
    // original_extension: "jpeg"
    // original_filename: "sample"
    // placeholder: false
    // public_id: "52eb91a2-a530-4dc9-8522-731a081eaa8d-sample.jpeg"
    // resource_type: "image"
    // secure_url: "https://res.cloudinary.com/mount-then-bike-bohol/image/upload/v1613311043/52eb91a2-a530-4dc9-8522-731a081eaa8d-sample.jpeg.jpg"
    // signature: "9e7205146c35bc8926fc03f5b3cbb32c2e2c8498"
    // tags: []
    // type: "upload"
    // url: "http://res.cloudinary.com/mount-then-bike-bohol/image/upload/v1613311043/52eb91a2-a530-4dc9-8522-731a081eaa8d-sample.jpeg.jpg"
    // version: 1613311043
    // version_id: "fcf9e8948c27281d21d340fc9c4f6b50"
    // width: 670
    if (status === "done") {
      console.log(JSON.parse(file.xhr.response));
    }
    if (status === "removed") {
      console.log("removed");
    }
  };

  return (
    <>
      <Dropzone
        accept="image/*"
        maxFiles={1}
        autoUpload={false}
        getUploadParams={upload}
        onChangeStatus={handleChangeStatus}
      />
    </>
  );
};

export default ImageUploader;
