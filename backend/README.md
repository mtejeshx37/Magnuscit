# Backend - Magnus Website

This is the Express.js backend for the Magnus Website.

## Prerequisites
- Node.js
- MongoDB (Running locally or a cloud URI)

## Setup
1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment:
    - Edit `.env` to set your `MONGO_URI` if it's different from the default (`mongodb://localhost:27017/magnus_website`).

## Running the Server
1.  Start the server:
    ```bash
    npm run dev
    ```
    The server will run on `http://localhost:5000`.

## Seeding Data
To populate the database with initial event data:
```bash
node seed.js
```

## API Endpoints
- **GET /api/events**: Get all events.
- **GET /api/events/:id**: Get a single event by ID.
- **POST /api/chat**: Send a message to the chatbot.
