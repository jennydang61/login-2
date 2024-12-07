import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const VerificationRequests = () => {
  const [verRequests, setVerRequests] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getVerRequests = async () => {
      try {
        const response = await axiosPrivate.get("/verify", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setVerRequests(response.data);
      } catch (err) {
        console.log(err);
        if (err.code !== "ERR_CANCELED")
          navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getVerRequests();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Verification Requests</h2>
      {verRequests?.length ? (
        <ul>
          {verRequests.map((request, i) => (
            <li key={i}>{request?.user_ID}</li>
          ))}
        </ul>
      ) : (
        <p>No requests to display</p>
      )}
    </article>
  );
};

export default VerificationRequests;
