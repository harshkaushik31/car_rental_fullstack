# Rent-a-Car 🚗

A full-stack web application that allows users to list their cars for rent and rent cars from other owners. Built with the MERN stack (MongoDB, Express, React, Node.js), this platform provides a seamless experience for both car owners and renters.

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.19.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## 🌟 Features

- **Become a Car Owner**: Register as a car owner and list your vehicles for rent
- **Add Cars for Rent**: Owners can add multiple cars with details and images
- **Date-Based Car Rental**: Search and book cars based on specific dates
- **Rent a Car**: Browse available cars and make reservations
- **View Rented Cars**: Track your rental history and current bookings
- **Image Management**: Upload and manage car images using ImageKit

## 🛠️ Technologies Used

- **Frontend**: React.js with Context API for state management
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Image Storage**: ImageKit
- **Authentication**: JWT (JSON Web Tokens)

## 📚 What I Learned

- Building full-stack applications with React.js
- Modern web development practices
- Implementing Context API for efficient state management
- RESTful API design and integration
- User authentication and authorization
- Working with cloud-based image storage solutions

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB account
- ImageKit account (for image storage)

### Installation

#### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd rent-a-car
```

#### 2. Server Setup

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Create .env file based on .env.example
cp .env.example .env
```

Configure your `.env` file with the following variables:

```env
PORT=8000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxxx.mongodb.net
CORS_ORIGIN=*
JWT_SECRET=your_secret_key_here
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

**Important**: Replace the placeholder values with your actual credentials:
- Update MongoDB URI with your database credentials
- Generate a secure JWT secret
- Add your ImageKit credentials from your ImageKit dashboard

#### 3. Client Setup

```bash
# Navigate to client folder
cd ../client

# Install dependencies
npm install

# Create .env file based on .env.example
cp .env.example .env
```

Configure the client `.env` file with necessary variables (refer to `.env.example` in the client folder).

#### 4. Running the Application

**Start the Server:**
```bash
cd server
npm start
```

**Start the Client:**
```bash
cd client
npm start
```

The application should now be running with:
- Frontend: `http://localhost:3000` (or your configured port)
- Backend: `http://localhost:8000`

## 📁 Project Structure

```
rent-a-car/
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   ├── .env.example
│   └── package.json
├── server/                 # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env.example
│   └── package.json
└── README.md
```

## 🔮 Future Improvements

- **Dark Mode**: Implement a dark theme toggle for better user experience
- **Payment Gateway Integration**: Add secure payment processing for rentals
- **Advanced Search Filters**: Location-based search, price range, car type filters
- **Rating System**: Allow users to rate and review cars and owners
- **Notification System**: Email/SMS notifications for bookings and updates
- **Mobile Responsiveness**: Enhanced mobile UI/UX

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

If you have any questions or suggestions, feel free to reach out!

---

**Happy Renting! 🚗💨**