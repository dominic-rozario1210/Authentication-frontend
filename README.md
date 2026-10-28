# Frontend Authentication System

A responsive authentication frontend built with React.js that provides user registration, login, forgot password, and password reset functionality. The application integrates with a backend REST API using Axios and provides form validation with Formik and Yup.

## Features

- User Registration
- User Login
- Forgot Password functionality
- Password Reset using a JWT token
- Reset token verification through backend middleware
- Time-limited password reset links
- Form validation using Formik and Yup
- API integration using Axios
- Toast notifications using React Toastify
- Navigation using React Router DOM
- Loading states during token verification and form submission
- Error handling for invalid or expired reset links
- Password confirmation validation
- Responsive authentication forms
- Redirect to login after successful password reset

## Tech Stack

- React.js
- JavaScript (ES6+)
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
├── vercel.json
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/dominic-rozario1210/Authentication-frontend.git
```

### 2. Navigate to the Project Directory

```bash
cd Authentication-frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the Application

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## Application Routes

| Route | Description |
|---|---|
| `/` | Home page |
| `/register` | Create a new account |
| `/login` | Log in to an existing account |
| `/forgot-password` | Request a password reset email |
| `/reset-password/:token` | Verify the reset token and set a new password |

## Backend Integration

The frontend communicates with a Node.js and Express.js REST API using Axios.

The backend uses MongoDB and Mongoose to store user information and `bcrypt` to hash passwords.

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate an existing user |
| POST | `/api/auth/forgot-password` | Request a password reset email |
| GET | `/api/auth/verify-token` | Verify the reset token |
| PUT | `/api/auth/change-password` | Update the user's password |
| GET | `/api/auth/profile` | Retrieve the authenticated user's profile |

The API base URL is configured through Axios. For production, configure it to point to your deployed backend.

## Password Reset Flow

1. The user enters their registered email address on the Forgot Password page.
2. The backend checks whether the user exists.
3. The backend generates a JWT reset token with a 10-minute expiration.
4. The reset link is sent to the user's email using the configured email service.
5. The user opens the reset link and reaches `/reset-password/:token`.
6. The frontend sends the token in the `Authorization` header to the backend's `/verify-token` endpoint.
7. The backend authentication middleware verifies the token and identifies the user.
8. The user enters a new password and confirms it.
9. The frontend validates the password fields using Formik and Yup.
10. The frontend sends a