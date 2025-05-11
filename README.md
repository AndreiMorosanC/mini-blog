# Mini-Blog App

A full-stack blogging application built with React, Firebase Authentication, Node.js/Express, and MongoDB. Users can sign up, create, edit, and delete their own blog posts, as well as view posts from other users.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Available Scripts](#available-scripts)
* [Folder Structure](#folder-structure)
* [Usage](#usage)
* [License](#license)

---

## Features

* User registration & login via Firebase Authentication
* Create, read, update, and delete (CRUD) blog posts
* Only authenticated users can manage their own posts
* Protected API routes on the backend
* Responsive UI with Tailwind CSS & Framer Motion animations

---

## Tech Stack

* **Frontend:** React, React Router, Firebase SDK, Tailwind CSS, Framer Motion
* **Backend:** Node.js, Express, Firebase Admin SDK, Mongoose (MongoDB)
* **Database:** MongoDB Atlas

---

## Prerequisites

* Node.js v14+ and npm or Yarn
* A Firebase project with Authentication enabled
* A MongoDB Atlas cluster

---

## Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/<your-username>/mini-blog.git
   cd mini-blog
   ```

2. **Install dependencies**

   * Frontend

     ```bash
     cd frontend
     npm install
     ```
   * Backend

     ```bash
     cd ../backend
     npm install
     ```

3. **Configure environment**
   Create a `.env` file in both `frontend` and `backend` folders as described below.

---

## Environment Variables

### Frontend (`frontend/.env`)

```ini
VITE_API_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Backend (`backend/.env`)

```ini
PORT=3000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/mini-blog?retryWrites=true&w=majority
FIREBASE_ADMIN_SDK_KEY=path/to/firebase-adminsdk.json
```

* `FIREBASE_ADMIN_SDK_KEY`: Path to your Firebase service account JSON file.

---

## Available Scripts

### Frontend

* `npm run dev` - Start Vite development server
* `npm run build` - Build production bundle
* `npm run preview` - Preview production build

### Backend

* `npm start` - Run Express server
* `npm run dev` - Run with nodemon for live reload

---

## Folder Structure

```
mini-blog/
├── frontend/             # React + Vite client
│   ├── src/
│   ├── public/
│   ├── index.css
│   └── ...
├── backend/              # Express + MongoDB API
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express routers
│   ├── services/         # Firebase admin setup
│   └── index.js
└── README.md             # This file
```

---

## Usage

1. Start both servers:

   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend (in a new terminal)
   cd frontend
   npm run dev
   ```
2. Open your browser at `http://localhost:5173` (or the port Vite reports).
3. Sign up or log in, then create, edit, or delete your own blog posts.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

> Built with ❤️ by Andrei Morosan
