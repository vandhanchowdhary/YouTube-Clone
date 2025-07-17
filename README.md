# YouTube Clone (MERN Stack)

This is a full-featured YouTube Clone built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It supports video upload, playback, filtering, commenting, channel management, and responsive design.

## 🧾 Project Structure

```bash
youtube-clone/
│
├── client/          # React Frontend
│   └── README.md
│
├── server/          # Node.js + Express Backend
│   └── README.md
│
└── README.md        # (this file)
```

## Tech Stack

1. MongoDB + Mongoose
2. Express.js
3. React + Vite + Tailwind CSS
4. Node.js
5. Cloudinary (video uploads & thumbnails)

<!-- vandhanchowdhary:mongo2003 -->

## Features

1. 🔐 JWT Authentication
2. 🎥 Video Upload & Playback
3. 🗂 Category-Based Filtering
4. 📺 Channel Creation & Management
5. 💬 Comments, Likes & Dislikes
6. 📱 Responsive Design
7. ⚙️ Admin/Owner actions for videos/channels

## Setup Instructions

### Clone this repo

#### GitHub CLI

```bash
gh repo clone vandhanchowdhary/YouTube-Clone
cd YOUTUBE-CLONE
```

#### HTTPS

```bash
git clone https://github.com/vandhanchowdhary/YouTube-Clone.git
cd YOUTUBE-CLONE
```

### Set up both frontend and backend

```bash
cd ../client/
npm install
cd ../server/
npm install
```

### Configure your environment

server/.env – set Mongo URI, JWT secrets, Cloudinary keys, etc.
> For this demo project I have included my own `.env` in the repo.

### Start the project

In both `/client/` folder and `/server/` folder

```bash
npm run dev
```

## Video Playback Notes

- ✔️ Three sample videos and two test videos are already seeded and hosted on Cloudinary.
- ✔️ The `uploads/` folder contains two local `.mp4` videos (under 10MB).
- 🔁 We can upload our own videos locally via the Upload form (multer-based).
- 📦 The project is kept under 40MB to meet requirements.

> NOT restricting uploads from `server-side` (Still in development)
