import { Link } from "react-router-dom";
// import VerificationRequests from "./VerificationRequests";
// import axios from "../api/axios";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import { useState, useEffect } from "react";

// import useRefreshToken from "../hooks/useRefreshToken"; // testing
// import Users from "./Users";

// const VERIFY_URL = "/verify";

const Admin = () => {
  // const [data, setData] = useState(null);
  // const axiosPrivate = useAxiosPrivate();
  // const refresh = useRefreshToken(); // testing
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axiosPrivate.get(VERIFY_URL);
  //       console.log(response.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <section>
      <h1>Admin Page</h1>
      <br />
      {/* <VerificationRequests /> */}
      {/* <p>Fetched Data</p>
      <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* <button onClick={() => refresh()}>Refresh</button> */}
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Admin;
