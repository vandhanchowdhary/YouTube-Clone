# YouTube Clone – Backend (Node.js + Express)

## Tech Used

- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary SDK
- Multer for local uploads

## Structure

```bash
server/
├── config/
├── controllers/
├── routes/
├── middleware/
├── models/
├── uploads/
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

## Autherization

1. User registration/login using `JWT` tokens
2. Protected routes via `verifyToken` middleware

## Environment Setup

1. Create a `.env` file:

> My own Environment setup is included.

```bash
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## Scripts

```bash
npm run dev     # Run with nodemon (dev)
```

## API Routes Overview

### Auth

1. `POST` /api/auth/register
2. `POST` /api/auth/login

### Channel

1. `GET` /api/channels/:id
2. `GET` /api/channels/me
3. `POST` /api/channels
4. `DELETE` /api/channels/:id

### Video

1. `GET` /api/videos
2. `POST` /api/videos
3. `PUT` /api/videos/:id
4. `DELETE` /api/videos/:id

### Comment

1. `POST` /api/comments
2. `PUT` /api/comments/:id
3. `DELETE` /api/comments/:id
