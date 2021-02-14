import aws from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
    region: process.env.AWS_S3_REGION,
    signatureVersion: "v4",
  });

  const generatedKey = uuidv4() + "-" + req.query.file;

  const s3 = new aws.S3();

  // post = {
  //   url: 'https://s3.ap-southeast-1.amazonaws.com/mount-then-bike-bohol',
  //   fields: {
  //     key: 'dabf30ae-574b-4d81-a844-c54b27bce9a0testFile?objectName=WhatsAppImage2020-04-12at09.57.09.jpeg',
  //     bucket: 'mount-then-bike-bohol',
  //     'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
  //     'X-Amz-Credential': 'AKIAJRTG7LXYMDO6HNMA/20210213/ap-southeast-1/s3/aws4_request',
  //     'X-Amz-Date': '20210213T130725Z',
  //     Policy: 'eyJleHBpcmF0aW9uIjoiMjAyMS0wMi0xM1QxMzowODoyNVoiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwxMDQ4NTc2XSx7ImtleSI6ImRhYmYzMGFlLTU3NGItNGQ4MS1hODQ0LWM1NGIyN2JjZTlhMHRlc3RGaWxlP29iamVjdE5hbWU9V2hhdHNBcHBJbWFnZTIwMjAtMDQtMTJhdDA5LjU3LjA5LmpwZWcifSx7ImJ1Y2tldCI6Im1vdW50LXRoZW4tYmlrZS1ib2hvbCJ9LHsiWC1BbXotQWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsiWC1BbXotQ3JlZGVudGlhbCI6IkFLSUFKUlRHN0xYWU1ETzZITk1BLzIwMjEwMjEzL2FwLXNvdXRoZWFzdC0xL3MzL2F3czRfcmVxdWVzdCJ9LHsiWC1BbXotRGF0ZSI6IjIwMjEwMjEzVDEzMDcyNVoifV19',
  //     'X-Amz-Signature': 'cdd66011b6f8cd8bef8ed757a7e1af47170d2c2053b78ec1100ecff303292804'
  //   }
  // }
  const post = await s3.createPresignedPost({
    Bucket: process.env.AWS_S3_BUCKET,
    Fields: {
      key: generatedKey,
    },
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 1048576], // up to 1 MB
    ],
  });

  res.status(200).json(post);
};

export default uploadHandler;
