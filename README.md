## Instructions to run the project

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14 or higher) & **npm**: [Download Node.js](https://nodejs.org/)
- **MongoDB:** [Download and install MongoDB](https://www.mongodb.com/) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Installation

### 1. Follow these instructions

### Clone the repo
```bash
git clone https://github.com/ShahabAli-1/job-portal.git
navigate inside the folder where you have cloned the repo: cd job-portal

cd server
npm install

### Create a .env in the server folder with the following
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

### start the server
npm start

### now for client

###navigate in to the client folder inside the terminal
cd ../client

### run the command
npm install

### Create a .env in the client folder with the following
REACT_APP_API_URL=http://localhost:5000

### run the command
npm start










