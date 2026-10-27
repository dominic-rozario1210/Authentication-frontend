# Frontend Authentication System

A responsive authentication frontend built with React.js that provides user registration, login, forgot password, and password reset functionality. The application integrates with a backend REST API using Axios and provides form validation with Formik and Yup.

## Features

- User Registration
- User Login
- Forgot Password functionality
- Password Reset using a secure token link
- JWT token verification through the backend API
- Form validation using Formik and Yup
- API integration using Axios
- Toast notifications using React Toastify
- Navigation using React Router
- Responsive authentication forms
- Loading and error handling

## Tech Stack

- React.js
- JavaScript
- CSS3
- Axios
- React Router DOM
- Formik
- Yup
- React Toastify
- Vite

## Project Structure

```text
auth-frontend/
├── src/
│   ├── components/
│   │   ├── Register.jsx
│   │   ├── Login.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── Home.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public/
├── package.json
└── README.md
```

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/dominic-rozario1210/Authentication-frontend
   ```

2. Navigate to the project directory:

   ```bash
   cd auth-frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal, usually `http://localhost:5173`.

## Application Routes

| Route | Description |
|---|---|
| `/register` | Create a new account |
| `/login` | Log in to an existing account |
| `/forgot-password` | Request a password reset email |
| `/reset-password/:token` | Verify the reset token and set a new password |
| `/` | Home page |

## Backend Integration

The frontend communicates with a backend REST API using Axios.

The backend should provide endpoints for registration, login, requesting a password reset, verifying reset tokens, and changing passwords.

Configure the Axios base URL to point to your backend server. For local development, this may be `http://localhost:5000`, depending on your backend configuration.

## Password Reset Flow

1. The user requests a password reset using their registered email address.
2. The backend generates a time-limited JWT reset token and sends an email.
3. The user opens the reset link.
4. The frontend sends the token to the backend for verification.
5. After successful verification, the user enters a new password.
6. The backend hashes and saves the new password.

## Running the Project

```bash
npm run dev
```

## Future Improvements

- Add show/hide password functionality.
- Improve accessibility and user experience.
- Add stronger password requirements.
- Deploy the frontend and connect it to a production backend.

## Author

Dominic Rozario
