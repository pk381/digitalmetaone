import axios from "axios";
import api from "../../constants/api";

const useFiles = () => {
  const getUplaodSignedUrl = async (key, contentType) => {
    try {
      if (!key || !contentType) {
        return false;
      }

      const response = await api.post("/api/files/upload-file", {
        key: key,
        contentType: contentType,
      });

      if (response?.data) {
        const jsonData = response?.data;

        if (jsonData?.status === "success") {
          return jsonData?.url;
        }
        return false;
      }
      return false;
    } catch (error) {
      console.log("Error occured at useFiles' getUplaodSignedUrl", error);
      return false;
    }
  };

  const getViewSignedUrl = async (key) => {
    try {
      if (!key) {
        return false;
      }

      const response = await api.post("/api/files/get-file", { key: key });

      if (response?.data) {
        const jsonData = response?.data;

        if (jsonData?.status === "success") {
          return jsonData?.url;
        }
        return false;
      }
      return false;
    } catch (error) {
      console.log("Error occured at useFiles' getViewSignedUrl", error);
      return false;
    }
  };

  const viewFile = async (key) => {
    if (!key) {
      return false;
    }
    const signedUrl = await getViewSignedUrl(key);

    console.log(signedUrl);
    return signedUrl;
  };

  const uploadToS3 = async (file, signedUrl, contentType) => {
    try {
      const response = await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      return response;
    } catch (error) {
      console.log("Error occured at useFiles' viewFile", error);
      return false;
    }
  };

  const uploadFile = async (file, folderName) => {
    if (!file) {
      return false;
    }

    const fileNameParts = file.name.split(".");
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

    const fileName = `image-${Date.now()}`;
    const key = `${folderName}/${fileName}.${fileExtension}`;
    const contentType = file.type;

    const signedUrl = await getUplaodSignedUrl(key, contentType);

    if (!signedUrl) {
      return false;
    }

    const isUploaded = await uploadToS3(file, signedUrl, contentType);

    console.log(isUploaded);

    return isUploaded.statusText === "OK" ? key : false;
  };

  return { viewFile, uploadFile };
};

export default useFiles;
