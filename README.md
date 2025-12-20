# MAGNUS 2026 Website

This is the official website for MAGNUS 2026, featuring event listings, details, and registration links.

## Tech Stack

**Frontend:**
*   React
*   Vite
*   Tailwind CSS
*   Framer Motion
*   Lucide React

**Backend:**
*   Node.js
*   Express
*   Nodemailer (for mailing functionality)

## Features

*   **Modern UI/UX:** Built with React and Framer Motion for smooth animations.
*   **Event Showcase:** Detailed information about various technical and non-technical events.
*   **Registration:** Direct links to Google Forms for event registration.
*   **Contact Form:** Integrated with Nodemailer to send inquiries directly to the organizers.
*   **Responsive Design:** Fully optimized for desktop and mobile devices.

## Getting Started

### Prerequisites

*   Node.js installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository_url>
    cd Magnus_Website
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Environment Variables

Create a `.env` file in the `backend` directory (or in the root for Vercel) with the following variables:

```env
PORT=5001
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
```

### Running Locally

To run the application locally, you can start the development server:

```bash
npm run dev
```

This will verify that the frontend starts correctly. For full functionality including the email backend, you might need to run the backend server separately if not using the proxy setup fully in dev relative to Vercel.

**Note:** The project is configured to proxy API requests to `http://localhost:5001` during development.

### Deployment on Vercel

This project is configured for easy deployment on **Vercel** as a monorepo (frontend + backend).

1.  Push your code to a Git repository (GitHub, GitLab, etc.).
2.  Import the project into Vercel.
3.  Vercel should automatically detect the settings.
4.  **Crucial:** Add the environment variables (`EMAIL_USER`, `EMAIL_PASS`) in the Vercel Project Settings.
5.  Deploy!

The `vercel.json` and `api/index.js` files handle the serverless function configuration for the backend.

## Project Structure

*   `/src`: Frontend source code (React components, pages, styles).
*   `/backend`: Backend source code (Express server, routes, controllers).
*   `/api`: Serverless entry point for Vercel.