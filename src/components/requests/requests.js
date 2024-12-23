import "./requests.css";
import React, { useState, useEffect, useCallback } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const Requests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  // fetch roommate requests
  const fetchRequests = useCallback(async () => {
    if (!user) return;
    try {
      const response = await axios.get(
        `/request/status?receiver_ID=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setRequests(response.data || []);
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  // accept
  const handleAccept = async (requestId) => {
    try {
      await axios.post(
        "/request/accept",
        { receiver_ID: user.id, accepted_by: user.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setRequests((prev) => prev.filter((req) => req.status_ID !== requestId));
    } catch (err) {
      console.log(err);
    }
  };

  // decline
  const handleDecline = async (requestId) => {
    try {
      await axios.post(
        "/request/decline",
        { receiver_ID: user.id, declined_by: user.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setRequests((prev) => prev.filter((req) => req.status_ID !== requestId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return (
    <div className="requests-container">
      <h2>Roommate Requests</h2>
      {requests.length === 0 ? (
        <p className="no-requests">No requests found.</p>
      ) : (
        <ul className="requests-list">
          {requests.map((request) => (
            <li key={request.status_ID} className="request-item">
              <p className="request-sender">
                Request from: {request.sender_name}
              </p>
              <div className="button-group">
                <button
                  className="accept-button"
                  onClick={() => handleAccept(request.status_ID)}
                >
                  Accept
                </button>
                <button
                  className="decline-button"
                  onClick={() => handleDecline(request.status_ID)}
                >
                  Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// hard code for testing
/*const Requests = () => {
    const [requests, setRequests] = useState([
      {
        status_ID: 1,
        sender_name: "John Doe",
      },
      {
        status_ID: 2,
        sender_name: "Jane Smith",
      },
      {
        status_ID: 3,
        sender_name: "Charlie Brown",
      },
      {
        status_ID: 4,
        sender_name: "Jane Walker",
      },
    ]);

    const handleAccept = (requestId) => {
      console.log(`Accepted request with ID: ${requestId}`);
      setRequests((prev) => prev.filter((req) => req.status_ID !== requestId));
    };

    const handleDecline = (requestId) => {
      console.log(`Declined request with ID: ${requestId}`);
      setRequests((prev) => prev.filter((req) => req.status_ID !== requestId));
    };

    return (
        <div className="requests-container">
          <h3>Roommate Requests</h3>
          {requests.length === 0 ? (
            <p className="no-requests">No requests found.</p>
          ) : (
            <ul className="requests-list">
              {requests.map((request) => (
                <li key={request.status_ID} className="request-item">
                  <p className="request-sender">Request from: {request.sender_name}</p>
                  <div className="button-group">
                    <button className="accept-button" onClick={() => handleAccept(request.status_ID)}>
                      Accept
                    </button>
                    <button className="decline-button" onClick={() => handleDecline(request.status_ID)}>
                      Decline
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      );

  }
      */

// const Requests = () => {
//   const [requests, setRequests] = useState([
//     {
//       status_ID: 1,
//       sender_name: "Emily Davis",
//     },
//     // {
//     //   status_ID: 2,
//     //   sender_name: "Jane Smith",
//     // },
//     // {
//     //   status_ID: 3,
//     //   sender_name: "Charlie Brown",
//     // },
//     // {
//     //   status_ID: 4,
//     //   sender_name: "Jane Walker",
//     // },
//   ]);

//   const handleAccept = (requestId) => {
//     console.log(`Accepted request with ID: ${requestId}`);
//     setRequests((prev) => prev.filter((req) => req.status_ID !== requestId));
//   };

//   const handleDecline = (requestId) => {
//     console.log(`Declined request with ID: ${requestId}`);
//     setRequests((prev) => prev.filter((req) => req.status_ID !== requestId));
//   };

//   return (
//     <div className="requests-container">
//       <h3>Roommate Requests</h3>
//       {requests.length === 0 ? (
//         <p className="no-requests">No requests found.</p>
//       ) : (
//         <ul className="requests-list">
//           {requests.map((request) => (
//             <li key={request.status_ID} className="request-item">
//               <p className="request-sender">
//                 Request from: {request.sender_name}
//               </p>
//               <div className="button-group">
//                 <button
//                   className="accept-button"
//                   onClick={() => handleAccept(request.status_ID)}
//                 >
//                   Accept
//                 </button>
//                 <button
//                   className="decline-button"
//                   onClick={() => handleDecline(request.status_ID)}
//                 >
//                   Decline
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
export default Requests;
