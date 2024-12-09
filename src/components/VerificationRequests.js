import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const VerificationRequests = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [verRequests, setVerRequests] = useState();
  const [success, setSuccess] = useState(false);

  let isMounted = true;

  const getVerRequests = async () => {
    isMounted = true;
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get("/verify", {
        signal: controller.signal,
      });
      // console.log(response.data);
      isMounted && setVerRequests(response.data);
    } catch (err) {
      console.log(err);
      if (err.code !== "ERR_CANCELED")
        navigate("/login", { state: { from: location }, replace: true });
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  // AJ's function BEGIN //
  const updateUserStatus = async (student_ID, status_name) => {
    try {
      const response = await axiosPrivate.put(
        "/verify",
        JSON.stringify(
          {
            student_ID,
            status_name,
          },
          null,
          2
        ),
        { headers: { "Content-Type": "application/json" } }
      );
      // console.log(response.data.message); // Log response message // devel
      // getVerRequests(); // refresh the list after updating
      setSuccess(true);
    } catch (err) {
      console.log("Error updating user stataus: ", err);
    }
  };
  // END //

  useEffect(() => {
    getVerRequests();
  }, []);

  return (
    <>
      {" "}
      {success ? (
        <main>
          <h1>Success!</h1>
          <br />
          <p>
            <button
              onClick={() => {
                setSuccess(false);
                getVerRequests();
              }}
            >
              <Link to="/admin">Go back to Admin page</Link>
            </button>
          </p>
        </main>
      ) : (
        <article>
          {/* <h2>Verification Requests</h2>
      {verRequests?.length ? (
        <ul>
          {verRequests.map((request, i) => (
            <li key={i}>{request?.user_ID}</li>
          ))}
        </ul>
      ) : (
        <p>No requests to display</p>
      )}
      {/* AJ's part below */}
          <div>
            {/* <h1>Admin Page</h1> */}
            <h2>Pending Users</h2>
            {verRequests?.length ? (
              <table>
                <thead>
                  <tr>
                    {/* <th>ID</th> */}
                    <th>Name</th>
                    <th>Email</th>
                    <th>Major</th>
                    <th>Year of Study</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {verRequests.map((student) => (
                    <tr key={student.user_ID}>
                      {/* <td>{user.user_ID}</td> */}
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.major}</td>
                      <td>{student.year_of_study}</td>
                      <td>{student.status_name}</td>
                      <td>
                        <button
                          onClick={() =>
                            updateUserStatus(student.user_ID, "Accepted")
                          }
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            updateUserStatus(student.user_ID, "Declined")
                          }
                        >
                          Decline
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No pending users.</p>
            )}
          </div>{" "}
        </article>
      )}
    </>
  );
};

export default VerificationRequests;
