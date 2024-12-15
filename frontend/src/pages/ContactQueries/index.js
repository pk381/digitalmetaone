import React, { useState, useEffect } from "react";

import { CircularProgress } from "@mui/joy";

import useContactUs from "../../hooks/useContactUs";

const ContactUsQueries = () => {
  const [loading, setLoading] = useState(true);
  const [queries, setQueries] = useState(null);
  const { fetchQueries } = useContactUs();

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchQueries();
      if (response) {
        setQueries(response);
        return setLoading(false);
      }

      setQueries([]);
      return setLoading(false);
    };
    fetch();
  }, []);

  return loading ? (
    <div className="w-full h-[76.5vh] flex justify-center items-center">
      <div>
        <CircularProgress />
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default ContactUsQueries;
