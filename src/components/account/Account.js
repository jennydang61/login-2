import React, { useState, useEffect } from "react";
import "./Account.css";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate, useLocation, replace } from "react-router-dom";

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  //   const [hasProfile, setHasProfile] = useState(false);
  const { user } = useAuth();
  const [verified, setVerified] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [profile, setProfile] = useState();
  //   {
  // // hard coded for now
  // name: "John Doe",
  // description: "John's profile",
  // rentRange: "$1000",
  // cleanliness: "5 / 10",
  // roomCapacity: "3 / 10",
  // noiseTolerance: "5 / 10",
  // location: "Northwest",
  // socialHabits: "Extrovert",
  // sleepSchedule: "Night Owl",
  //   });
  const navigate = useNavigate();

  // this should fetch profile
  /*
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`/profile/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                setProfile(response.data); 
            } catch (error) {
                console.error(error);
            }
        };

        if (user && user.id) {
            fetchProfile();
        }
    }, [user]);
    */
  let isMounted = true;

  const getProfile = async () => {
    isMounted = true;
    const controller = new AbortController();
    try {
      const fetchedProfile = await axiosPrivate.get("/profile/find-one");
      console.log(fetchedProfile);
      if (fetchedProfile) {
        setProfile(fetchedProfile.data);
        console.log("data:", fetchedProfile);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkVerified = async () => {
    try {
      const verified = await axiosPrivate.get("/verify/check");
      console.log(verified); // devel
      if (verified.data === "Accepted") {
        setVerified(true);
      } else setVerified(false);
    } catch (err) {
      console.log(err);
    }
  };

  // update profile
  const handleSave = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const updatedProfile = {
      // hard coded for now
      description: formData.get("description"),
      rentRange: formData.get("rentRange"),
      cleanliness: formData.get("cleanliness"),
      roomCapacity: formData.get("roomCapacity"),
      location: formData.get("location"),
      noiseTolerance: formData.get("noiseTolerance"),
      socialHabits: formData.get("socialHabits"),
      sleepSchedule: formData.get("sleepSchedule"),
    };

    try {
      // this is suppose to update profile not sure if it works
      /*
            await axios.put(`/profile/${user.id}`, updatedProfile, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            */
      setProfile((prev) => ({ ...prev, ...updatedProfile }));
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkVerified();
    getProfile();
    console.log(profile);
  }, []);

  return (
    <>
      {profile ? (
        <div className="profile-container">
          {isEditing ? (
            <form className="form-wrapper" onSubmit={handleSave}>
              <h1 className="title">Edit Account</h1>

              <label className="input-label">Description</label>
              <textarea
                className="text-area"
                name="description"
                defaultValue={profile.description}
              ></textarea>

              <label className="input-label">Rent Range</label>
              <input
                className="text-input"
                type="number"
                name="rentRange"
                max="5000"
                defaultValue={profile.rentRange}
              />

              <label className="input-label">Cleanliness</label>
              <input
                className="text-input"
                type="number"
                name="cleanliness"
                min="1"
                max="10"
                defaultValue={profile.cleanliness}
              />

              <label className="input-label">Room Capacity</label>
              <input
                className="text-input"
                type="number"
                name="roomCapacity"
                min="1"
                max="10"
                defaultValue={profile.roomCapacity}
              />

              <label className="input-label">Noise Tolerance</label>
              <input
                className="text-input"
                type="number"
                name="noiseTolerance"
                defaultValue={profile.noiseTolerance}
                min="1"
                max="10"
              />

              <label className="input-label">Location</label>
              <select
                className="text-input"
                name="location"
                defaultValue={profile.location}
              >
                <option value="NW">Northwest</option>
                <option value="NE">Northeast</option>
                <option value="SW">Southwest</option>
                <option value="SE">Southeast</option>
              </select>

              <label className="input-label">Social Habits</label>
              <select
                className="text-input"
                name="socialHabits"
                defaultValue={profile.socialHabits}
              >
                <option value="Extrovert">Extrovert</option>
                <option value="Introvert">Introvert</option>
                <option value="Ambivert">Ambivert</option>
              </select>

              <label className="input-label">Sleep Schedule</label>
              <select
                className="text-input"
                name="sleepSchedule"
                defaultValue={profile.sleepSchedule}
              >
                <option value="Early Bird">Early Bird</option>
                <option value="Night Owl">Night Owl</option>
              </select>
              <button type="submit" className="edit-button">
                Save
              </button>
            </form>
          ) : (
            <div className="view-mode">
              <h1 className="title">Account</h1>
              <p className="view-field">
                <strong>Full Name:</strong> {profile.name}
              </p>
              <p className="view-field">
                <strong>Description:</strong> {profile.description}
              </p>
              <p className="view-field">
                <strong>Rent Range:</strong> {profile.range}
              </p>
              <p className="view-field">
                <strong>Cleanliness:</strong> {profile.clean_level}
              </p>
              <p className="view-field">
                <strong>Room Capacity:</strong> {profile.room_amount}
              </p>
              <p className="view-field">
                <strong>Location:</strong> {profile.quadrant}
              </p>
              <p className="view-field">
                <strong>Noise Tolerance:</strong> {profile.tolerance_level}
              </p>
              <p className="view-field">
                <strong>Social Habits:</strong> {profile.habits}
              </p>
              <p className="view-field">
                <strong>Sleep Schedule:</strong> {profile.sleep_type}
              </p>
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ) : verified ? (
        <div>
          <button
            className="edit-button"
            onClick={() => navigate("/create-profile", { replace: true })}
          >
            Create Profile
          </button>
        </div>
      ) : (
        <div>
          <h3>Please wait until we verify your account.</h3>
        </div>
      )}
    </>
  );
};

export default Account;
