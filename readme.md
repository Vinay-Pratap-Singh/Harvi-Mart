# Harvi Mart - E-commerce Project

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Credits](#credits)
- [Conclusion](#conclusion)

## Introduction

Harvi Mart is a full-fledged e-commerce project built using ReactJS, TypeScript, Chakra UI, Redux Toolkit, React Hook Form, and various other technologies. This document provides an overview of the project, its features, installation instructions, and more. It has all the features from products to admin dashboard for the user.

## Technologies Used

- **Frontend**:

  - React JS - JavaScript Library
  - Typescript JS - For type safety
  - Chakra UI - React Component Library
  - Redux Toolkit - State Management
  - Chart JS and React Chart JS - For chart
  - jspDF and html2canvas - For PDF generation
  - React Hook Form - Form Management
  - React Hot Toast - For toast notification
  - React Helmet - For Search Engine Optimisation (SEO)
  - React Icons - For icons
  - React Router DOM - For routing and role-based authentication
  - Axios - For API calls
  - Workbox - Progressive Web Application (PWA)
  - Freekpik - For all the images

- **Backend**:
  - This project is using the backend created by Shivam Vijaywargi (Thanks to him)
  - [Github Repo Link](https://github.com/shivamvijaywargi/AmmaJaan-backend)

## Features

Harvi Mart boasts a wide range of features to provide a seamless e-commerce shopping experience:

- ### User Authentication and Authorization

  - User registration and login
  - Role-based access control for administrators and users
  - Secure password storage and authentication
  - Forget and reset password for user

- ### Product Catalog

  - Comprehensive product catalog showcasing a wide range of products
  - User-friendly product listings with images, descriptions, and prices
  - Categories for easy navigation
  - Advanced search and filtering options

- ### Wishlist Functionality

  - Allow users to create and manage wishlists
  - Add and remove products from the wishlist
  - Conveniently track desired items for future purchase

- ### Shopping Cart Functionality

  - Fully functional shopping cart
  - Add, remove, and update cart items
  - Calculate total order amount
  - User can apply coupon for discounts
  - Seamless integration with the checkout process

- ### Secure Payment Processing with Stripe

  - Integration with Stripe for secure and reliable payment processing
  - Support for credit/debit card payments
  - SSL encryption for data security
  - Payment confirmation and order processing

- ### User Profiles

  - User profile pages to view and update personal information
  - Manage shipping addresses for efficient order processing

- ### Order History

  - Detailed order history for users
  - View past orders with order status and details

- ### Contact Form with Netlify Integration

  - Contact form for user queries and support
  - Netlify integration for reliable form handling and email notifications
  - Streamline user communication and support

- ### Admin Dashboard

  - #### Overview

    - Admin dashboard with an informative overview of the e-commerce platform
    - Visual charts and statistics for products, categories, and user activity

  - #### User Management

    - Manage user accounts

  - #### Order Management

    - Access order details, including order status and customer information
    - Update or cancel order

  - #### Category Manipulation

    - Create, edit, update and delete product categories
    - Organize the product catalog efficiently

  - #### Coupon Management

    - Create and manage discount coupons and promotions
    - Apply discounts to specific products or orders

  - #### Product Manipulation

    - Add, edit, and remove products from the catalog
    - Upload product images, descriptions, and pricing information

  - #### Report Generation
    - Generate downloadable reports in PDF format
    - Easily obtain reports on products, categories, orders, and user activity

- ### Responsive Design

  - A fully responsive design that adapts to all screen sizes and devices
  - Ensures an optimal shopping experience on desktops, tablets, and mobile phones

- ### Progressive Web App (PWA)
  - Built as a Progressive Web App (PWA) for enhanced user engagement and offline access
  - Users can install the web app on their devices for quick access
  - Works seamlessly even in low or no network connectivity scenarios

## Installation

Follow these steps to set up and run the Harvi Mart project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/Vinay-Pratap-Singh/Harvi-Mart.git
   ```

2. Navigate to the project directory:

   ```bash
   cd harvi-mart
   ```

3. Install dependencies using Yarn:

   ```bash
   yarn
   ```

4. Create the .env file and add the required details

## Usage

To start the development server and run the project locally, use the following command:

```bash
yarn start
```

## Project Structure

The overall strcture of the project is as follows:

- **/src:** Contains the source code of the React application.
- **/public:** HTML template and manifest.json for PWA.
- **/src/assets:** For static images
- **/src/components:** React components
- **/src/helper:** For role based authentication, custom hooks, axios instance and interfaces for typescript
- **/src/pages:** For all user and admin pages
- **/src/redux:** For all redux devtool slices
- **/src/router:** For all routes
- **/src/shimmer:** For shimmers used

## Credits

- This project is using the backend created by [Shivam Vijaywargi](https://github.com/shivamvijaywargi/AmmaJaan-backend)
- All the images used in this project is taken from the [Freepik](https://www.freepik.com/) website

## Conclusion

Harvi Mart has been an incredible journey of growth and learning. This project has not only enhanced my technical skills but also allowed me to create something that I am genuinely proud of.

Harvi Mart has helped me to elevate my skills and creativity. It's been a fantastic experience, and I am excited to share it with you.
