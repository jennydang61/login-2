import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
// import Home from "./components/Home";
import LandingPage from "./components/landing/landingPage";
import LinkPage from "./components/LinkPage";
import Admin from "./components/Admin";
// import Editor from "./components/Editor";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import CreateProfile from "./components/CreateProfile";
import HeaderLayout from './components/header/HeaderLayout';
import Messages from './components/messages/messages';
import Requests from './components/requests/requests';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="landing" element={<LandingPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/Requests" element={<HeaderLayout><Requests /></HeaderLayout>} />
        <Route path="/Messages" element={<HeaderLayout><Messages /></HeaderLayout>} />
        {/* /<Route path="/Account" element={<HeaderLayout><Account /></HeaderLayout>} /> */}


        {/* want to protect these routes */}
        <Route element={<RequireAuth allowedRole={"ADMIN"} />}>
          <Route path="admin" element={<Admin />} />
          <Route path="linkpage" element={<LinkPage />} />
          {/* <Route path="editor" element={<Editor />} /> */}
        </Route>
        <Route element={<RequireAuth allowedRole={"STUDENT"} />}>
          <Route path="/" element={<Home />} />
          <Route path="create-profile" element={<CreateProfile />} />
        </Route>

        {/* catch-all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
