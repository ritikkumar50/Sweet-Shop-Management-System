# Sweet Shop Management System

A modern, full-stack web application designed for managing a sweet shop. This system provides a seamless experience for customers to browse and purchase sweets, while offering robust backend support for order and product management.

## 🚀 Features

- **User Authentication**: Secure user registration and login using JWT.
- **Product Catalog**: Browse a wide variety of sweets with detailed descriptions.
- **Shopping Cart**: Add items to a persistent cart and manage quantities.
- **Order Processing**: Seamless checkout experience with order confirmation.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS for mobile and desktop.
- **Interactive UI**: Smooth animations using Framer Motion and Lottie.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **Animations**: Framer Motion, Lottie React
- **State/Routing**: React Router DOM, Context API
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Token (JWT), Bcryptjs
- **Security**: Helmet, CORS

## 📂 Project Structure

- **Sweet Shop/**: Contains the React frontend application.
- **backend/**: Contains the Node.js/Express backend API.

## 🏁 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    ```

2.  **Backend Setup**
    Navigate to the backend directory and install dependencies:
    ```bash
    cd backend
    npm install
    ```

    Create a `.env` file in the `backend` directory with the following variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    NODE_ENV=development
    ```

    Start the backend server:
    ```bash
    npm run dev
    ```

3.  **Frontend Setup**
    Navigate to the frontend directory:
    ```bash
    cd "Sweet Shop"
    npm install
    ```

    Start the development server:
    ```bash
    npm run dev
    ```

## 📜 Scripts

### Backend
- `npm run dev`: Runs the server in development mode with Nodemon.
- `npm start`: Runs the server in production mode.
- `npm test`: Runs tests using Jest.

### Frontend
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Previews the production build.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## 📄 License

This project is licensed under the ISC License.
