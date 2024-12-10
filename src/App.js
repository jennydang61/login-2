import { Routes, Route, Navigate } from "react-router-dom"; // Import Navigate for redirection
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import LandingPage from "./components/landing/landingPage";
import LinkPage from "./components/LinkPage";
import Admin from "./components/Admin";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import CreateProfile from "./components/CreateProfile";
import HeaderLayout from './components/header/HeaderLayout';
import Messages from './components/messages/messages';
import Requests from './components/requests/requests';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Redirect the root path to /landing */}
        <Route index element={<Navigate to="/landing" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="landing" element={<LandingPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Protected routes */}
        <Route element={<RequireAuth allowedRole={"ADMIN"} />}>
          <Route path="admin" element={<Admin />} />
          <Route path="linkpage" element={<LinkPage />} />
        </Route>
        <Route element={<RequireAuth allowedRole={"STUDENT"} />}>
          <Route path="/" element={<Home />} />
          <Route path="create-profile" element={<CreateProfile />} />
        </Route>
        <Route element={<RequireAuth allowedRole={"STUDENT"} />}>
          <Route path="messages" element={<HeaderLayout><Messages /></HeaderLayout>} />
        </Route>
        <Route element={<RequireAuth allowedRole={"STUDENT"} />}>
        <Route path="requests" element={<HeaderLayout><Requests /></HeaderLayout>} />
        </Route>

        {/* catch-all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
