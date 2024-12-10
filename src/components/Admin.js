import { Link } from "react-router-dom";
import VerificationRequests from "./VerificationRequests";

// import useRefreshToken from "../hooks/useRefreshToken"; // devel

const Admin = () => {
  // const refresh = useRefreshToken(); //devel

  return (
    <section>
      <h1>Admin Page</h1>
      <br />
      <VerificationRequests />
      <div className="flexGrow">
        {/* <Link to="/linkpage">Link Page</Link> */}
      </div>
      {/* <button onClick={refresh}>Refresh</button> // devel */}
    </section>
  );
};

export default Admin;
