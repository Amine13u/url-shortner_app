# URL Shortening Service

This application is a simple URL shortening service built with Node.js, Express, React, and Tailwind CSS. It includes a backend API for shortening URLs and a frontend client for user interaction.

## Project Structure

The project is split into two main parts:

- **Client**: A React-based frontend that allows users to shorten URLs and display QR codes.
- **Server**: A backend built with Node.js and Express, which handles URL shortening and stores data in MongoDB.

## Technologies Used

### Backend (Server)

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **Jest**: Testing framework
- **TypeScript**: For type safety
- **Nodemon**: For automatic server restarts during development
- **Qrcode**: For generating QR codes

### Frontend (Client)

- **React**: JavaScript library for building user interfaces
- **Vite**: Next-generation build tool for React
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Axios**: HTTP client for making API requests
- **React Toastify**: For displaying notifications
- **React Router**: For client-side routing

## Setup Instructions

### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Amine13u/url-shortner_app.git
cd url-shortner_app
```

### 2. Install backend dependencies

Navigate to the server directory and install the necessary dependencies:

```bash
cd server
npm install
```

### 3. Install frontend dependencies

Navigate to the client directory and install the necessary dependencies:

```bash
cd client
npm install
```

### 4. Run the project

To run both the client and server concurrently navigate to the root directory:

```bash
npm run dev
```

### 5. Run tests

To run tests for the backend:

```bash
cd server
npm run test
```
