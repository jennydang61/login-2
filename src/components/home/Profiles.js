import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Profiles = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const [profiles, setProfiles] = useState();
  const [userId, setUserId] = useState();
  const [success, setSuccess] = useState(false);

  let isMounted = true;

  const getProfiles = async () => {
    isMounted = true;
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get("/profile", {
        signal: controller.signal,
      });
      setUserId(response.data.user_ID);
      isMounted && setProfiles(response.data.profiles);
      console.log(userId);
    } catch (err) {
      if (err.code !== "ERR_CANCELLED") {
        console.log(err);
      }
    }
    // setProfiles(test);
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <section className="profile-grid">
      {profiles
        ?.filter((profile) => profile.user_ID !== userId)
        .map((profile) => (
          <ProfileCard
            key={profile.profile_ID}
            name={profile.name}
            sleepSchedule={profile.sleep_type}
            location={profile.quadrant}
          />
        ))}
    </section>
  );
};

export default Profiles;
