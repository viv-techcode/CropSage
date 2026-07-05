# CropSage
CropSage is an AI-powered agricultural support platform that helps farmers make smarter crop planning, market pricing, profit estimation, and weather-based decisions through data-driven insights and personalized recommendations.

## Tech Stack

Frontend: React
Backend: FastAPI
Database: PostgreSQL (Supabase)


## Database Choice

This project uses **MongoDB** as the database with **Mongoose** as the Object Data Modeling (ODM) library.

### Why MongoDB?

* Flexible document-based schema suitable for agricultural crop records.
* Easy integration with Node.js and Express.
* Scalable and efficient for CRUD operations.
* Stores data in JSON-like BSON documents, making it compatible with React and REST APIs.
* Mongoose provides schema validation and simplifies database interactions.

---

## Database Schema

The Crop collection stores information about each crop managed by the application.

| Field     | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| cropName  | String | Name of the crop                    |
| quantity  | Number | Quantity of the crop                |
| unit      | String | Unit of measurement (kg, ton, etc.) |
| location  | String | Farm location                       |
| price     | Number | Market price per unit               |
| season    | String | Crop season (Rabi, Kharif, Zaid)    |
| status    | String | Current crop status                 |
| notes     | String | Additional notes                    |
| createdAt | Date   | Record creation timestamp           |
| updatedAt | Date   | Last updated timestamp              |

### Schema Diagram

![alt text](W5_SchemaDiagram_26100553.png)
---

## Set Up the Database

### Prerequisites

* Node.js
* npm
* MongoDB Atlas account or local MongoDB installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your MongoDB Atlas connection string or local MongoDB URI.

### 3. Start the Backend

```bash
npm start
```

or, if using Nodemon:

```bash
npm run dev
```

### 4. Verify the Database Connection

Open the following endpoint in a browser or Postman:

```text
http://localhost:5000/api/crops
```

If the API returns crop data (or an empty array when no data exists), the backend is successfully connected to the MongoDB database.
