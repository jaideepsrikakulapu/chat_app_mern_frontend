
# ChatApp - Frontend

## 📌 Project Overview
This is the Phase 1 submission for a real-time chat application frontend built using **React.js**. Users can log in, view other users, and send messages in a live chat interface.

## 🧾 Features Implemented
- Login & Register forms
- Home page layout
- Chat interface with message list and user list
- Responsive UI using Flexbox

## 🛠️ Technologies Used
- React.js (CRA)
- CSS3
- React Router (for navigation)
- Axios (API requests placeholder)

## 🚀 How to Run
1. Clone the repository or unzip the folder
2. Run the following commands:


npm install
npm start

# 💬 ChatApp - Real-Time Chat Application (Frontend)

## 🧠 Abstract

In the digital age where instant communication is essential, the need for robust, secure, and scalable messaging platforms is growing rapidly. This project addresses that need by developing a **real-time chat application** using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js), enriched with **Socket.IO** for bi-directional real-time communication and **WebRTC** for peer-to-peer video calling.

The project solves the problem of lacking a customizable, open-source chat system that integrates **text messaging**, **image messaging**, **video calls**, and **profile management** into one seamless experience. Built with a modular component-based architecture, the app ensures responsiveness, scalability, and user interactivity.

---

## ⚙️ Technologies and Libraries Used

### 🔧 Frontend
- **React.js** – Component-based UI
- **React Router DOM** – Navigation
- **Tailwind CSS** – Utility-first CSS styling
- **ShadCN UI** – Accessible and customizable components
- **Axios** – HTTP requests to backend APIs
- **Socket.IO-client** – Real-time messaging
- **Simple-Peer** – Wrapper for WebRTC
- **WebRTC API** – Peer-to-peer video/audio communication
- **Framer Motion** – Animation effects
- **Lucide React** – Icon library
- **UUID** – Unique room and message IDs

### 🧠 Backend (used during full-stack integration)
- Node.js, Express.js, MongoDB, Mongoose
- Socket.IO (server-side)
- JSON Web Tokens (JWT) for authentication
- Multer & Cloudinary for image uploads

---

## 🔁 Design & Application Flow

### 👤 Authentication
- User Registration and Login
- Passwords secured with JWT (token-based auth)
- Protected routes for dashboard and chat

### 💬 Messaging Features
- Real-time chat using Socket.IO
- Support for **text messages**
- Support for **image messages**
- **Typing indicators** and **read/unread status**
- **Timestamps** for every message
- **Emoji reactions** on messages
- **Search functionality** for contacts
- Notifications badge for unread messages

### 🧑‍💼 User Profile
- Profile photo upload (Cloudinary)
- Editable name, username, and bio
- Real-time updates of user info across the app
- Profile display on hover or click

### 🎥 Video Calling
- Join video call using a unique **Room ID**
- **WebRTC + Simple-Peer** for P2P connection
- Support for **multiple participants**
- Toggle buttons for **mute**, **camera**, **leave**, and **reactions**
- Real-time video grid layout with user streams
- Scalable peer mesh built using dynamic signaling

---

## 📁 Folder Structure

ChatApp_Frontend/
│
├── public/
│ └── index.html
│
├── src/
│ ├── assets/ # Static files (images, etc.)
│ ├── components/ # Reusable components
│ │ ├── ChatBox.jsx
│ │ ├── UserList.jsx
│ │ ├── MessageItem.jsx
│ ├── pages/ # Routes/pages
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ └── Home.jsx
│ ├── App.jsx
│ ├── index.js
│ ├── styles/
│ │ ├── chat.css
│ │ ├── auth.css
│ │ └── app.css
│
├── .gitignore
├── package.json
├── README.md

