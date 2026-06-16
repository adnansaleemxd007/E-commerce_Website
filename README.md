# Ecomzy - E-Commerce Shopping App

A clean, modern, and responsive e-commerce front-end application built with React. This project features a product gallery, filtering by category and price, and a "add to cart" functionality.

## 📋 Features

- **Product Gallery:** Displays all available products in a clean grid layout.
- **Filtering by Category:** Allows users to sort products by categories like "Men's clothing," "Jewelry," "Electronics," etc.
- **Filtering by Price:** Users can filter products based on pre-defined price ranges.
- **Search Bar:** A functional search bar in the navigation to find products.
- **Shopping Cart:** Functionality to add items to a shopping cart (state managed locally).
- **Responsive Design:** The layout is fully responsive and works on mobile, tablet, and desktop screens.

## 🛠️ Tech Stack

This project is built using modern front-end technologies:

- **[React.js](https://reactjs.org/):** A JavaScript library for building user interfaces.
- **[React Router](https://reactrouter.com/):** For client-side routing and navigation between pages (e.g., Home, Cart).
- **[Context API](https://reactjs.org/docs/context.html) / [Redux Toolkit](https://redux-toolkit.js.org/):** For global state management (managing cart items, filters, etc.).
- **CSS / (S)CSS:** For custom styling, layout, and responsiveness. (Alternatively: **Styled Components** or **Tailwind CSS**).
- **[Axios](https://axios-http.com/):** For making API requests to fetch product data.
- **[Fake Store API](https://fakestoreapi.com/):** (Likely) Used as a free REST API for placeholder product data.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

You must have [Node.js](https://nodejs.org/en/) (which includes npm) installed on your computer.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/ianshulx/React-projects-for-beginners.git
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd E-commerce_Website
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the root directory and add your MongoDB Atlas connection string:
    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
    ```

5.  **Run the full-stack application:**
    ```bash
    npm run dev
    ```
    This will concurrently start the Express backend on port 5000 and the React frontend on [http://localhost:3000](http://localhost:3000).
