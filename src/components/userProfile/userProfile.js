import './userProfile.css';
import React, { useState } from 'react';
import axios from "../../api/axios";

function UserProfile() {
    const [profile] = useState({
        fullName: 'John Doe',
        description: 'Looking for a clean, quiet roommate.',
        rentRange: '$1000',
        cleanliness: '8 / 10',
        roomCapacity: '1 / 10',
        location: 'NW',
        noiseTolerance: '5 / 10',
        socialHabits: 'Introvert',
        sleepSchedule: 'Night Owl',
    });

    const [review, setReview] = useState('');
    const [message, setMessage] = useState('');

    const handleSendRequest = async () => {
        try {
            // hard coded for now
            const response = await axios.post('/request/send', {
                receiver_ID: 2,
                sender_ID: 1,    
                sender_name: 'John Doe',  
                description: profile.description
            });
            setMessage(response.data.success);
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to send request.");
        }
    };

    const handleReviewSubmit = (event) => {
        event.preventDefault();
        console.log('Review submitted:', review);
        setReview('');
    };

    return (
        <div className="profile-container">
            <div className="view">
                <h1 className="title">Account</h1>
                <p className="view-field"><strong>Full Name:</strong> {profile.fullName}</p>
                <p className="view-field"><strong>Description:</strong> {profile.description}</p>
                <p className="view-field"><strong>Rent Range:</strong> {profile.rentRange}</p>
                <p className="view-field"><strong>Cleanliness:</strong> {profile.cleanliness}</p>
                <p className="view-field"><strong>Room Capacity:</strong> {profile.roomCapacity}</p>
                <p className="view-field"><strong>Location:</strong> {profile.location}</p>
                <p className="view-field"><strong>Noise Tolerance:</strong> {profile.noiseTolerance}</p>
                <p className="view-field"><strong>Social Habits:</strong> {profile.socialHabits}</p>
                <p className="view-field"><strong>Sleep Schedule:</strong> {profile.sleepSchedule}</p>

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
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default UserProfile;
