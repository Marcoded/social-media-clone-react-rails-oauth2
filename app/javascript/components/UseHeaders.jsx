import { useEffect, useState } from "react";

const useHeaders = () => {
  const [headers, setHeaders] = useState({});

  useEffect(() => {
    const fetchHeaders = async () => {
      
            const csrfToken = document.querySelector("[name=csrf-token]").content;
            const headers = {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-CSRF-Token": csrfToken,
            };
          ;
  
      setHeaders(headers);
    };

    fetchHeaders();
  }, []);

  return headers;
};

export default useHeaders;