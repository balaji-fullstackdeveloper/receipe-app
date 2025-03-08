# Recipe Sharing Platform

A full-stack MERN (MongoDB, Express, React, Node.js) application for sharing and managing cooking recipes.

## Features

- View all recipes with filtering by category and ingredient search
- Add new recipes with title, ingredients, instructions, category, and cooking time
- Edit existing recipes
- Delete recipes
- Responsive design for both desktop and mobile
- User-friendly interface with Material-UI components

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd recipe-sharing-platform
```

2. Install backend dependencies:

```bash
npm install
```

3. Install frontend dependencies:

```bash
cd client
npm install
```

4. Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe-platform
```

## Running the Application

1. Start the MongoDB server (if using local installation)

2. Start the backend server:

```bash
npm run server
```

3. Start the frontend development server:

```bash
cd client
npm start
```

4. For running both frontend and backend concurrently:

```bash
npm run dev
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

- GET `/api/recipes` - Get all recipes
- GET `/api/recipes?category=<category>` - Get recipes by category
- GET `/api/recipes?ingredient=<ingredient>` - Search recipes by ingredient
- GET `/api/recipes/:id` - Get a specific recipe
- POST `/api/recipes` - Create a new recipe
- PUT `/api/recipes/:id` - Update a recipe
- DELETE `/api/recipes/:id` - Delete a recipe

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Express Validator
- Cors
- Dotenv

### Frontend

- React
- Material-UI
- Axios
- React Router DOM

## Project Structure

```
recipe-sharing-platform/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   └── App.js         # Main React component
├── models/                # MongoDB models
├── routes/                # API routes
├── .env                   # Environment variables
├── server.js             # Express server
└── package.json          # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
