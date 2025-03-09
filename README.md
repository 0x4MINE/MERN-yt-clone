# MERN YouTube Clone

A full-stack YouTube clone built using the **MERN (MongoDB, Express, React, Node.js)** stack.

## 🚀 Features

✅ User Authentication (JWT)  
✅ Video Uploading & Streaming  
✅ Like, Comment, & Subscription System  
✅ Watch History & Playlists  
✅ Responsive UI & Dark Mode  
✅ Backend REST API  
✅ Cloudinary Storage for Video Uploads *(optional)*  

## 🛠️ Tech Stack

- **Frontend:** React.js, Redux, Tailwind CSS  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Authentication:** JWT (JSON Web Tokens)  
- **Storage:** Cloudinary Storage / Local Storage  

## 📂 Project Structure
```md
MERN-YT-Clone/
│── backend/ # Express.js server & APIs
│── frontend/ # React.js client
│── .gitignore
│── package.json
│── README.md
```
## 🏗️ Installation

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/0x4MINE/MERN-yt-clone.git
cd MERN-yt-clone
```

### **2️⃣ Backend Setup**
```sh
cd backend
npm install
npm start
```

### **2️⃣ Frontend Setup**
```sh
cd backend
npm install
npm start
```

## Environment Variables (.env)
Create a .env file inside the backend directory and add:
```sh
PORT = your_port
JWT = your_secret_key
CLOUD_NAME = cloudinary_cloud_name
CLOUD_API_KEY = cloudinary_api_key
CLOUD_API_SECRET = cloudinary_api_secret
MONGO_URI=your_mongodb_connection_string
```

## Future Enhancements:
🔹 Live Streaming Support
🔹 Advanced Video Recommendations
🔹 Admin Dashboard

## 🙌 Contributing
Contributions are welcome! Feel free to fork, open an issue, or submit a PR.
