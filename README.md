# Noice 

**Noice where music comes alive**, a sleek and powerful **full-stack** music streaming web-app designed to bring your favorite tunes to your fingertips. Built with modern web technologies, Noice offers an immersive, intuitive, and customizable way to listen

---

## 🎨 UI Preview

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)
![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)
![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


---

## 🛠 Technology Stack

| Layer          | Technologies & Tools                      |
|----------------|-----------------------------------------|
| Frontend       | React.js, Context API, Tailwind CSS, framermotion  |
| Backend        | Node.js, Express.js, MongoDB, Mongoose  |
| Authentication | JWT, bcrypt                             |
| Media Storage  | Cloudinary                              |
| AI  | Gemini flash2.0 (for Lyrics Generation)                              |

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm installed
- MongoDB instance (local or cloud)
- Cloudinary account for media hosting

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/Pray45/Noice.git
cd Noice
```

2. **Install dependencies**
```bash
cd client && npm install
cd ../server && npm install
```
3. **Configure environment variables**
Create .env in the /server folder:
```js
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GEMINI_AI_KEY=your_api_key
```
4. **Run the app**

```bash
# Backend
cd server
npm run dev

# Frontend
cd ../client
npm start
```
**Frontend**
Open your browser at http://localhost:5173 


