import React from "react";

import ActivateAccountModal from "../ActivateAccountModal";
import UploadRecieptModal from "../UploadRecieptModal";
import { toastError, toastSuccess } from "../Notification";

import useFiles from "../../hooks/useFiles";
import useJoiningRequests from "../../hooks/useJoiningRequests";

import { useAuthContext } from "../../contexts/authContext";

const ActivateSection = ({ setLoading }) => {
  const { user } = useAuthContext();
  const { uploadFile } = useFiles();
  const { addJoiningRequest } = useJoiningRequests();

  const uploadReciept = async (file, name, amount, usdtTrcId) => {
    setLoading(true);

    const fileKey = await uploadFile(file, "reciepts");

    if (!fileKey) {
      setLoading(false);
    }

    console.log(fileKey);

    const response = await addJoiningRequest(
      name,
      usdtTrcId,
      amount,
      fileKey,
      user?.referenceId
    );

    if (response) {
      toastSuccess("Activatation Request Created Successfully");
    } else {
      toastError("Activatation Request Failed");
    }
    return setLoading(false);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 pt-10 items-center justify-center flex-col">
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Join Us Now
          </h1>
          <p className="mb-8 leading-relaxed">
            To attain globally best standards and become a world-class financial
            services enterprise – guided by its purpose to move towards a
            greater degree of sophistication and maturity
          </p>
          <div className="flex justify-center">
            <ActivateAccountModal />

            <UploadRecieptModal uploadReciept={uploadReciept} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivateSection;
