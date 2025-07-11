# EcoPulse Backend

Node.js + Express backend for EcoPulse.

## Features
- JWT Auth (Register/Login)
- MongoDB Atlas ready
- User password hashing (bcrypt)

## Setup

```bash
git clone https://github.com/yourusername/ecopulse-backend.git
cd ecopulse-backend
npm install
cp .env.example .env
# fill in MONGO_URI and JWT_SECRET
npm run dev
