# Anime Ranker AI: Personalized Anime Recommendation System

This project implements an AI-powered system to rank users' anime preferences using a K-Nearest Neighbors (KNN) algorithm. It provides personalized responses through the Llama 2 API and is integrated into a full-stack web application built with ReactJS and PostgreSQL. The application uses OAuth 2.0 for secure authentication and retrieves data via the MyAnimeList API.

## Features

- **Personalized Anime Recommendations**:
  - Uses the KNN algorithm to analyze user preferences and rank anime.
  - Leverages the Llama 2 API for generating personalized responses.

- **Full-Stack Web Application**:
  - Built with ReactJS for a responsive front-end.
  - PostgreSQL for robust and scalable data management.

- **Secure User Authentication**:
  - Integrated with OAuth 2.0 to ensure secure user login.
  - Fetches user data seamlessly from MyAnimeList API.

- **Interactive User Experience**:
  - Clean and modern user interface.
  - Real-time data processing and feedback.

---

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [How It Works](#how-it-works)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Integration](#integration)
4. [API Reference](#api-reference)
5. [Examples](#examples)
6. [Dependencies](#dependencies)
7. [Contributing](#contributing)
8. [License](#license)

---

## Installation

### Prerequisites

- Node.js 16+
- PostgreSQL 12+
- MyAnimeList account for API access

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/SergioPeterson/RateMyAnimeList.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   - Create a PostgreSQL database and configure connection settings.
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=anime_ranker
   DB_USER=your_username
   DB_PASSWORD=your_password
   ```
4. Start the application:
   ```bash
   npm run dev
   ```

---

## Usage

### User Workflow

1. Login using OAuth 2.0 via MyAnimeList.
2. Interact with the application to input your anime preferences.
3. View personalized anime rankings and recommendations.

### Developer Workflow

- Modify the backend logic in `src/content.tsx`.
- Update the front-end in `src/App.tsx` and associated styles in `src/*.css`.
- Test changes using the sample data provided in `sampleData.jsonl`.

---

## How It Works

### Backend

- **KNN Algorithm**: Processes user-provided data and compares it with the existing dataset to calculate anime rankings.
- **PostgreSQL**: Stores user profiles, preferences, and computed rankings.
- **Llama 2 API**: Generates personalized feedback based on user interactions.

### Frontend

- **ReactJS**: Handles user interface and dynamic content rendering.
- **Login Flow**: Ensures secure and seamless user authentication through OAuth 2.0.

### Integration

- **MyAnimeList API**:
  - Fetches user watch history and ratings.
  - Populates the database with anime metadata.

---

## API Reference

### Endpoints

#### `/api/recommendations`
- **Method**: POST
- **Description**: Fetches personalized anime recommendations.
- **Request Body**:
  ```json
  {
    "user_id": "string",
    "preferences": "array"
  }
  ```
- **Response**:
  ```json
  {
    "recommendations": [
      { "anime_title": "string", "score": "float" }
    ]
  }
  ```

#### `/api/user`
- **Method**: GET
- **Description**: Fetches user profile details.
- **Response**:
  ```json
  {
    "username": "string",
    "email": "string"
  }
  ```

---

## Examples

### Input Preferences

```json
{
  "user_id": "12345",
  "preferences": ["action", "comedy", "drama"]
}
```

### Output Recommendations

```json
{
  "recommendations": [
    { "anime_title": "Fullmetal Alchemist", "score": 9.8 },
    { "anime_title": "One Punch Man", "score": 9.2 }
  ]
}
```

---

## Dependencies

- ReactJS
- PostgreSQL
- Axios
- OAuth 2.0
- MyAnimeList API
- Llama 2 API

Install all dependencies using:

```bash
npm install
```

---

## Contributing

We welcome contributions! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes with clear messages.
4. Submit a pull request for review.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

