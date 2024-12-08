import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import "./css/createProfile.css";

function CreateProfile() {
  const [formData, setFormData] = useState({
    // fullName: "",
    description: "",
    rentRange: "",
    cleanliness: "",
    roomCapacity: "",
    location: "",
    noiseTolerance: "",
    socialHabits: [],
    sleepSchedule: "",
  });

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axiosPrivate.post(
        "/profile",
        JSON.stringify(
          {
            formData,
          },
          null,
          2
        ),
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);
    } catch (err) {
      console.log("CreateProfile: ", err);
    }
  };

  return (
    <main className={"profile-container"}>
      <form className={"form-wrapper"} onSubmit={handleSubmit} noValidate>
        <h1 className={"title"}>Create Profile</h1>

        {/* <div>
          <label htmlFor="fullName" className={"input-label"}>
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className={"text-input"}
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div> */}

        <div>
          <label htmlFor="description" className={"input-label"}>
            Description
          </label>
          <textarea
            id="description"
            className={"text-area"}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Tell us about yourself"
            required
          />
        </div>

        <div>
          <label htmlFor="rentRange" className={"input-label"}>
            Rent Range
          </label>
          <input
            type="number"
            id="rentRange"
            min="0"
            max="5000"
            className={"text-input"}
            value={formData.rentRange}
            onChange={(e) => handleChange("rentRange", e.target.value)}
            placeholder="Enter your budget (up to $5000)"
            required
          />
        </div>

        <div>
          <label htmlFor="cleanliness" className={"input-label"}>
            Cleanliness Level
          </label>
          <input
            type="number"
            id="cleanliness"
            className={"text-input"}
            value={formData.cleanliness}
            onChange={(e) => handleChange("cleanliness", e.target.value)}
            placeholder="Rate cleanliness (1-10)"
            min="1"
            max="10"
            required
          />
        </div>

        <div>
          <label htmlFor="roomCapacity" className={"input-label"}>
            Room Capacity
          </label>
          <input
            type="number"
            id="roomCapacity"
            className={"text-input"}
            min="1"
            max="10"
            placeholder="Enter room capacity (1-10)"
            value={formData.roomCapacity}
            onChange={(e) => handleChange("roomCapacity", e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="noiseTolerance" className={"input-label"}>
            Noise Tolerance
          </label>
          <input
            type="number"
            id="noiseTolerance"
            className={"text-input"}
            value={formData.noiseTolerance}
            onChange={(e) => handleChange("noiseTolerance", e.target.value)}
            placeholder="Rate noise tolerance (1-10)"
            min="1"
            max="10"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className={"input-label"}>
            Location
          </label>
          <select
            id="location"
            className={"text-input"}
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            required
          >
            <option value="">Select Quadrant</option>
            <option value="NW">Northwest</option>
            <option value="NE">Northeast</option>
            <option value="SW">Southwest</option>
            <option value="SE">Southeast</option>
          </select>
        </div>

        <div>
          <label htmlFor="socialHabits" className={"input-label"}>
            Social Habits
          </label>
          <select
            id="socialHabits"
            className={"text-input"}
            value={formData.socialHabits}
            onChange={(e) => handleChange("socialHabits", e.target.value)}
            required
          >
            <option value="">Select Social Habit</option>
            <option value="Extrovert">Extrovert</option>
            <option value="Introvert">Introvert</option>
            <option value="Ambivert">Ambivert</option>
          </select>
        </div>

        <div>
          <label htmlFor="sleepSchedule" className={"input-label"}>
            Sleep Schedule
          </label>
          <select
            id="sleepSchedule"
            className={"text-input"}
            value={formData.sleepSchedule}
            onChange={(e) => handleChange("sleepSchedule", e.target.value)}
            required
          >
            <option value="">Select Schedule</option>
            <option value="Early Bird">Early Bird</option>
            <option value="Night Owl">Night Owl</option>
          </select>
        </div>

        <button type="submit" className={"submit-button"}>
          <span className={"submit-button-text"}>Create</span>
        </button>
      </form>
    </main>
  );
}

export default CreateProfile;
