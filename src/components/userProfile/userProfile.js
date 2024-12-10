import "./userProfile.css";
import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

function UserProfile({ receiver_ID }) {
  const { auth } = useAuth();
  const [profile] = useState({
    fullName: "John Doe",
    description: "Looking for a clean, quiet roommate.",
    rentRange: "$1000",
    cleanliness: "8 / 10",
    roomCapacity: "1 / 10",
    location: "NW",
    noiseTolerance: "5 / 10",
    socialHabits: "Introvert",
    sleepSchedule: "Night Owl",
  });

  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSendRequest = async () => {
    try {
      const response = await axios.post("/request/send", {
        receiver_ID: receiver_ID,
        sender_ID: auth.id,
        sender_name: auth.name,
        description: profile.description,
      });
      setMessage(response.data.success);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send request.");
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("/review/1"); // assuming 1 is the user ID
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  //   const handleSendRequest = async () => {
  //     try {
  //       // hard coded for now
  //       const response = await axios.post("/request/send", {
  //         receiver_ID: 2,
  //         sender_ID: 1,
  //         sender_name: "John Doe",
  //         description: profile.description,
  //       });
  //       setMessage(response.data.success);
  //     } catch (error) {
  //       setMessage(error.response?.data?.message || "Failed to send request.");
  //     }
  //   };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/review/add", {
        reviewer_ID: 1, // replace with the actual reviewer ID
        reviewed_ID: 2, // replace with the actual reviewed ID
        rate: 5, // assume a rating of 5 for simplicity
        comment: review,
      });
      setMessage(response.data.message);
      setReview("");
      // Fetch reviews again to update the list
      const newReviews = await axios.get("/review/2"); // replace with the actual reviewed ID
      setReviews(newReviews.data);
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage(error.response?.data?.message || "Failed to submit review.");
    }
  };

  return (
    <div className="profile-container">
      <div className="view">
        <h1 className="title">Account</h1>
        <p className="view-field">
          <strong>Full Name:</strong> {profile.fullName}
        </p>
        <p className="view-field">
          <strong>Description:</strong> {profile.description}
        </p>
        <p className="view-field">
          <strong>Rent Range:</strong> {profile.rentRange}
        </p>
        <p className="view-field">
          <strong>Cleanliness:</strong> {profile.cleanliness}
        </p>
        <p className="view-field">
          <strong>Room Capacity:</strong> {profile.roomCapacity}
        </p>
        <p className="view-field">
          <strong>Location:</strong> {profile.location}
        </p>
        <p className="view-field">
          <strong>Noise Tolerance:</strong> {profile.noiseTolerance}
        </p>
        <p className="view-field">
          <strong>Social Habits:</strong> {profile.socialHabits}
        </p>
        <p className="view-field">
          <strong>Sleep Schedule:</strong> {profile.sleepSchedule}
        </p>

        <button className="request-button" onClick={handleSendRequest}>
          Send Roommate Request
        </button>
        {message && <p className="message">{message}</p>}

        <h2 className="review-title">Write a Review</h2>
        <form className="review-form" onSubmit={handleReviewSubmit}>
          <textarea
            className="review-input"
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
