import React, { useState } from "react";
import axios from "axios";
import "./Home.css";
import glasses from "../../images/glassespfp.png";
import green from "../../images/greenpfp.png";
import hat from "../../images/hatpfp.png";
import blonde from "../../images/blondepfp.png";

const ProfileCard = ({ imageSrc, name }) => (
  <article className="profile-card">
    <img
      src={imageSrc}
      alt={`Profile picture of ${name}`}
      className="profile-image"
    />
    <h3 className="profile-name">{name}</h3>
    <button className="view-profile-button">View profile</button>
  </article>
);

const Home = () => {
  /*const [searchQuery, setSearchQuery] = useState('');*/
  const [showDropdown, setShowDropdown] = useState(false);
  const [filters, setFilters] = useState({
    rentRange: "",
    cleanLevel: 0,
    roomAmount: 0,
    location: "",
    noiseTolerance: 0,
    socialHabits: [],
    sleepSchedule: "",
  });

  const profiles = [
    { id: 1, name: "John Doe", imageSrc: glasses },
    { id: 2, name: "Jane Doe", imageSrc: green },
    { id: 3, name: "Alex Smith", imageSrc: hat },
    { id: 4, name: "Emily Davis", imageSrc: blonde },
  ];

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    /*console.log('Search Query:', searchQuery);
    console.log('Selected Filters:', filters);*/
  };

  return (
    <main className="profile-explorer">
      <div className="container">
        <h1 className="title">Profile Explorer</h1>
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            id="searchInput"
            className="search-input"
            placeholder="Search profiles"
            /*onChange={(e) => setSearchQuery(e.target.value)} */
          />
          <div className="dropdown">
            <button
              type="button"
              className="preferences-button"
              onClick={toggleDropdown}
            >
              Preferences
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <div>
                  <label htmlFor="rentRange">Rent Range:</label>
                  <input
                    type="range"
                    id="rentRange"
                    min="0"
                    max="5000"
                    step="100"
                    value={filters.rentRange}
                    onChange={(e) =>
                      handleFilterChange("rentRange", e.target.value)
                    }
                  />
                  <span>
                    {filters.rentRange ? `$${filters.rentRange}` : ""}
                  </span>
                </div>

                <div>
                  <label htmlFor="cleanLevel">Cleanliness Level:</label>
                  <input
                    type="range"
                    id="cleanLevel"
                    min="1"
                    max="10"
                    value={filters.cleanLevel}
                    onChange={(e) =>
                      handleFilterChange("cleanLevel", e.target.value)
                    }
                  />
                  <span>{filters.cleanLevel}</span>
                </div>

                <div>
                  <label htmlFor="roomAmount">Room Capacity:</label>
                  <input
                    type="number"
                    id="roomAmount"
                    min="1"
                    max="10"
                    value={filters.roomAmount}
                    onChange={(e) =>
                      handleFilterChange("roomAmount", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label htmlFor="location">Location:</label>
                  <select
                    id="location"
                    value={filters.location}
                    onChange={(e) =>
                      handleFilterChange("location", e.target.value)
                    }
                  >
                    <option value="">Select Quadrant</option>
                    <option value="NW">Northwest</option>
                    <option value="NE">Northeast</option>
                    <option value="SW">Southwest</option>
                    <option value="SE">Southeast</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="noiseTolerance">Noise Tolerance:</label>
                  <input
                    type="range"
                    id="noiseTolerance"
                    min="1"
                    max="10"
                    value={filters.noiseTolerance}
                    onChange={(e) =>
                      handleFilterChange("noiseTolerance", e.target.value)
                    }
                  />
                  <span>{filters.noiseTolerance}</span>
                </div>

                <div>
                  <label htmlFor="socialHabits">Social Habits:</label>
                  <select
                    id="socialHabits"
                    multiple
                    value={filters.socialHabits}
                    onChange={(e) =>
                      handleFilterChange(
                        "socialHabits",
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      )
                    }
                  >
                    <option value="Extrovert">Extrovert</option>
                    <option value="Introvert">Introvert</option>
                    <option value="Ambivert">Ambivert</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="sleepSchedule">Sleep Schedule:</label>
                  <select
                    id="sleepSchedule"
                    value={filters.sleepSchedule}
                    onChange={(e) =>
                      handleFilterChange("sleepSchedule", e.target.value)
                    }
                  >
                    <option value="">Select Schedule</option>
                    <option value="Early Bird">Early Bird</option>
                    <option value="Night Owl">Night Owl</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </form>
        <section className="profile-grid">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              name={profile.name}
              imageSrc={profile.imageSrc}
            />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Home;
