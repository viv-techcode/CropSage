# Backend

FastAPI backend for CropSage.


## How to Run the Backend Locally

### Prerequisites

* Node.js (v18 or later recommended)
* npm
* MongoDB Atlas account or a local MongoDB instance

### 1. Clone the Repository

```bash
git clone <repository-url>
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your MongoDB Atlas URI or local MongoDB connection string.

### 4. Start the Server

```bash
npm start
```

If your project uses Nodemon during development:

```bash
npm run dev
```

### 5. Verify the Backend

Open your browser or Postman and visit:

```text
http://localhost:5000/api/crops
```

A successful response confirms that the backend server is running and connected to the database.

### Available API Endpoints

| Method | Endpoint                                       | Description              |
| ------ | ---------------------------------------------- | ------------------------ |
| GET    | `/api/crops`                                   | Retrieve all crops       |
| GET    | `/api/crops/:id`                               | Retrieve a crop by ID    |
| POST   | `/api/crops`                                   | Create a new crop        |
| PUT    | `/api/crops/:id`                               | Update an existing crop  |
| DELETE | `/api/crops/:id`                               | Delete a crop            |
| GET    | `/api/crops/search/location?location=Dehradun` | Filter crops by location |
