
# Wisdres

Wisdres is a full-stack web application designed for managing a digital library of books. It provides both an admin panel and a user-facing catalog, allowing administrators to manage content and users to browse and explore books efficiently.

## 🚀 Live Demo

Try it now: [https://wisdres.vercel.app](https://wisdres.vercel.app)

User Data to Log In:
E-mail: wisdres_test@wisdres.com
Password: lB2a.3.m7[U>

![image] https://github.com/Gorsun4ic/wisdres/tree/main/src/assets/preview.png

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contact](#contact)

## Features

- 🔐 Role-based admin authentication system.
- 📚 Book management: create, update, delete, browse.
- 🧑 Admin panel for content moderation and data input.
- 🔍 Book search by genre, rating, and more.
- 📱 Responsive UI across all devices.
- 🌐 i18n support for multiple languages (via i18next).

## Technologies Used

- **Frontend:**
  - React
  - Redux Toolkit + RTK Query
  - TypeScript
  - React Router
  - Styled Components
  - i18n
  - React Error Boundary
  - MUI (Material UI)

- **Backend:**
  - Node.js
  - Express
  - MongoDB (Mongoose)

- **Other:**
  - Vercel (Frontend Hosting)

## Getting Started

To get a local copy of the project up and running, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Gorsun4ic/wisdres.git
   ```

2. Navigate to the project directory:

   ```bash
   cd wisdres
   ```

3. Install the required packages:

   ```bash
   npm install
   ```

4. Set up environment variables:
    Create a `.env` file in the root directory of the project and add the following:
    ```
    MONGODB_URI="mongodb+srv://<your_username>:<your_password>@<your_cluster_name>.mongodb.net/<your_database_name>?retryWrites=true&w=majority&appName=<your_app_name>"
    CLIENT_URL="http://localhost:5178" # Or the URL of your frontend application
    JWT_SECRET_KEY= Any safe string
    MAILTRAP_TOKEN= A token from mailtrap if you want to use registration with email. To get need to sign up in mailtrap
    MAILTRAP_ENDPOINT="https://send.api.mailtrap.io/"

5. Run the application:

   ```bash
   npm run dev
   ```

   The app will be running on `http://localhost:5173`.


## Deployment

The backend API is deployed on [Vercel](https://vercel.com/) as Serverless Functions. This allows for automatic scaling and efficient resource management.


## Contact

Herhel Yehor - [gorsunfoster@gmail.com](mailto:gorsunfoster@gmail.com)

Project Link: [https://github.com/gorsun4ic/quizcrafter](https://github.com/gorsun4ic/quizcrafter)
