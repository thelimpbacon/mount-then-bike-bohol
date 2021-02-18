import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

const deleteImageHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const public_id = req.query.public_id;
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = await cloudinary.utils.api_sign_request(
    {
      public_id,
      timestamp,
    },
    process.env.CLOUDINARY_API_SECRET
  );

  return res.status(200).json({ signature, timestamp });
};

export default deleteImageHandler;
