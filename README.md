**Table of Contents**

Prerequisites

Setup

Environment Variables Guide

Run





**Prerequisites**

Before starting, make sure you have:

Node.js (v16+ recommended)

npm or yarn

MongoDB Atlas or a local MongoDB database

Setup

Clone the repository:

git clone https://github.com/your-username/chatting-app.git

cd chatting-app


**Install dependencies:**

npm install
or
yarn install

Create a .env file in the root directory:

touch .env




**Environment Variables Guide**
**Add the following variables to your .env file:**

PORT=3000

The port your backend server will run on. Default is 3000.

MONGO_URI=Your MongoDB URI here

Connection string to your MongoDB database. Example: mongodb+srv://username:password@cluster0.mongodb.net/yourdbname

JWT_SECRET=YourSecretKeyHere

Secret key used to sign JWT tokens for authentication. Keep it secure and private.

X_API_KEY=YourApiKeyHere


**Running the Server**
npm run dev
or
yarn dev

Server will run at: http://localhost:3000


**Production Mode**
npm run build
npm start


