const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const { AWS_S3 } = require("../constants/aws");

const s3Client = new S3Client({
  region: AWS_S3.region,
  endpoint: "https://s3-ap-south-1.amazonaws.com",
  credentials: {
    accessKeyId: AWS_S3.accessKeyId,
    secretAccessKey: AWS_S3.secretAccessKey,
  },
});

const getObjectUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: AWS_S3.bucket,
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
};

const getUploadUrl = async (key, contentType) => {
  console.log("reached here");

  const command = new PutObjectCommand({
    Bucket: AWS_S3.bucket,
    Key: key,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3Client, command);
  console.log(url);
  return url;
};

const getViewSignedUrl = async (req, res) => {
  try {
    const { key } = req.body;

    if (!key) {
      return res.status(200).json({
        status: "missing-key",
        url: null,
      });
    }

    const signedUrl = await getObjectUrl(key);

    if (!signedUrl) {
      return res.status(200).json({
        status: "failed",
        url: null,
      });
    }
    return res.status(200).json({
      status: "success",
      url: signedUrl,
    });
  } catch (error) {
    console.log(
      "Error occured at uploadFileController's getViewSignedUrl",
      error
    );
    return res.status(500).json({
      status: "failed",
      url: null,
    });
  }
};

const getUploadSignedUrl = async (req, res) => {
  try {
    const { key, contentType } = req.body;

    if (!key || !contentType) {
      return res.status(200).json({
        status: "missing-metadata",
        url: null,
      });
    }

    const signedUrl = await getUploadUrl(key, contentType);

    if (!signedUrl) {
      return res.status(200).json({
        status: "failed",
        url: null,
      });
    }

    return res.status(200).json({
      status: "success",
      url: signedUrl,
    });
  } catch (error) {
    console.log(
      "Error occured at uploadFileController's getUploadSignedUrl",
      error
    );
    return res.status(500).json({
      status: "failed",
      url: null,
    });
  }
};

module.exports = { getViewSignedUrl, getUploadSignedUrl };
