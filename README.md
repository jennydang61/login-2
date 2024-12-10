### Overview

This repository contains the frontend implementation for the Roommate Finder System, a web application designed to connect university students with compatible roommates. The frontend provides an intuitive and user-friendly interface for browsing profiles, managing roommate requests, and customizing user preferences.

Built with React.js, the application focuses on responsiveness, interactivity, and seamless communication with the backend via RESTful APIs.

### Technology Stack
1. React.js

Reason for Choosing:
React.js is a powerful library for building interactive and dynamic user interfaces. Its key benefits include:
	•	Component-Based Architecture: Enables reusable, maintainable UI components for profile cards, forms, and modals.
	•	Declarative Syntax: Simplifies state and DOM management, improving development efficiency.
	•	Strong Ecosystem: Provides access to tools like React Router for navigation and Context API for state management.

### Project Structure
```
 roommate-finder-frontend/
├── src/
│   ├── components/    # Reusable UI components (e.g., ProfileCard, RequestModal)
│   ├── pages/         # Main views of the app (e.g., Home, Profile, Requests)
│   ├── context/       # State management using Context API
│   ├── utils/         # Helper functions for data formatting or API calls
│   ├── App.js         # Main application component
│   └── index.js       # Entry point of the application
├── public/            # Static assets and index.html
└── README.md          # Documentation
```

Features

	•	Profile Browsing: View roommate profiles with filtering options.
	•	Request Management: Send, accept, or decline roommate requests.
	•	Responsive Design: Optimized for mobile and desktop users.
