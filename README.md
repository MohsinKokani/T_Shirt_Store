# E-Commerce T-Shirt Store - MERN Stack Project

Welcome to the E-Commerce T-Shirt Store project! This is a full-stack web application built using the MERN (MongoDB, Express.js, React, Node.js) stack, designed to showcase a collection of T-shirts available for purchase. Users can browse through the collection, apply filters, add products to their cart, proceed to checkout, and place orders. The project also includes user authentication, password management, and a profile page.

## Introduction

The E-Commerce T-Shirt Store project is aimed at providing users with a seamless shopping experience for purchasing T-shirts. Users can create accounts, browse the available T-shirt collection, apply various filters, add products to their cart, and complete the checkout process. The project is built on a robust foundation, leveraging technologies such as the MERN stack for building both the frontend and backend.

## Features

- **User Authentication:**
    * JWT-based authentication system.
    * User roles: admin and user.
    * Forgot password and password reset functionality using Node Mailer.

- **Product Management:**  
    * T-shirts are showcased with images, price, and ratings.
    * Users can filter products based on price, ratings, and queries.
    * Product stock management prevents over-purchasing.

- **Cart and Checkout:**
    * Users can add products to their cart.
    * Cart displays a list of selected products.
    * Seamless checkout process.
    * Orders are created and stored after successful checkout.

- **Profile Page:**
    * Users can edit their profile details.
    * Option to update user avatar using Cloudinary.

## Project Structure
```
├── backend # Node.js and Express.js backend
│ ├── controllers # Route controllers for handling requests
| ├── db #connection function for MongoDB Atlas
│ ├── middleware # Authentication and Role Middleware
│ ├── models # MongoDB data models
│ ├── routes # API routes
│ └── views # hbs file for reset Password
├── frontend # React.js frontend
│ ├── public # Public assets
│ └── src # Source code
│   ├── actions # Redux actions
│   ├── components # Reusable React components
│   └── reducers # Redux reducers
├── screenshots # Project screenshots for documentation
└── README.md # Project documentation (you are here)
```


## Technologies Used

- MongoDB: NoSQL database for storing user data, products, carts, and orders.
- Express.js: Backend framework for building APIs and handling requests.
- React: Frontend library for building dynamic user interfaces.
- Node.js: JavaScript runtime for server-side development.
- Redux: State management for the frontend application.
- Cloudinary: Cloud storage for storing user avatars and product images.
- JWT: JSON Web Tokens for secure authentication.
- Node Mailer: Sending password reset emails to users.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/e-commerce-tshirt-store.git`
2. Navigate to the backend directory: `cd backend`
3. Install backend dependencies: `npm install`
4. Create a `.env` file based on the provided `.env.example` and configure environment variables.
5. Start the backend server: `node app.js`
6. Open a new terminal window.
7. Navigate to the frontend directory: `cd frontend`
8. Install frontend dependencies: `npm install`
9. Start the frontend application: `npm start`

## Usage

1. Open your web browser and access the application at `http://localhost:3000`.
2. Register a new user account or log in if you already have an account.
3. Browse the T-shirt collection, filter products, and add desired items to your cart.
4. Proceed to the cart, review your selections, and complete the checkout process.
5. View and update your profile details on the profile page.

## Screenshots

![screenshot1](https://github.com/MohsinKokani/T-Shirt-Store/assets/126567752/23eb6bd8-f004-4c88-9bd1-8190e0954ca7)
![screenshot2](https://github.com/MohsinKokani/T-Shirt-Store/assets/126567752/59e90268-8346-46b2-ae30-12949cdb8bb5)

