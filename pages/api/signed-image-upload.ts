import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";

const signedUploadHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const public_id = uuid() + "-" + req.query.file;

  const signature = await cloudinary.utils.api_sign_request(
    {
      timestamp,
      // eager: "w_400,h_300,c_pad|w_260,h_200,c_crop",
      public_id,
    },
    process.env.CLOUDINARY_API_SECRET
  );

  return res.status(200).json({ timestamp, signature, public_id });
};

export default signedUploadHandler;
