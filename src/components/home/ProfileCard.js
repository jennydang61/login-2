const ProfileCard = ({ name, location, sleepSchedule }) => (
  <article className="profile-card">
    <h3 className="profile-name">{name}</h3>
    <br />
    <p className="profile-text">
      <strong>Location: </strong>
      {location}
    </p>
    <p className="profile-text">
      <strong>Sleep Schedule: </strong>
      {sleepSchedule}
    </p>
    <button className="view-profile-button">View profile</button>
  </article>
);
export default ProfileCard;
