// ==============================
// Importing Required Modules
// ==============================
import express from "express";              // Import Express.js framework
import pkg from "pg";                       // Import PostgreSQL client library
import dotenv from "dotenv";                // Load environment variables from a .env file

// =============================
// Configure Environment Variables
// =============================
dotenv.config();                            // Load environment variables into process.env

// ==============================
// Initialize Express Application
// ==============================
const app = express();                
app.use(express.json());                    // Middleware to parse incoming JSON requests

// Define the port the server will listen on
const PORT = process.env.PORT || 3000;

// ==============================
// PostgreSQL Client Configuration
// ==============================
const { Client } = pkg;                     // Destructure the PostgreSQL client from the `pg` package

const client = new Client({
    user: process.env.DB_USER,              // PostgreSQL username from .env
    host: process.env.DB_HOST,              // PostgreSQL host from .env
    database: process.env.DB_NAME,          // PostgreSQL database name
    password: process.env.DB_PASSWORD,      // PostgreSQL user password
    port: process.env.DB_PORT,              // PostgreSQL port
});

/**
 * Initializes the PostgreSQL database connection
 * - Connects to the database
 * - Creates the "contents" table if it doesn't already exist
 */
const initializeDatabase = async () => {
    try {
        await client.connect();             // Establish connection with PostgreSQL
        console.log('✅ Connected to the database.');

        // SQL query to create the "contents" table if it doesn't exist
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS contents (
                id SERIAL PRIMARY KEY,     -- Auto-incrementing ID
                content TEXT NOT NULL,      -- Content field (required)
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp when content is added
            );
        `;

        await client.query(createTableQuery);  // Execute table creation query
        console.log('✅ Table "contents" is ready.');
    } catch (error) {
        console.error('❌ Error during database initialization:', error.stack);
    }
};

// Call the function to initialize the database on server start
initializeDatabase();

// ==============================
// ✅ Health Check Route
// ==============================

/**
 * ✅ GET /api
 * Health check endpoint to verify server and database status
 */
app.get('/api', async (req, res) => {
    const currentTime = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    try {
        const dbCheck = await client.query('SELECT NOW()'); // Query the current time from the database

        res.status(200).json({
            status: "✅ Server is running",
            currentTime,
            database: {
                status: "✅ Connected",
                dbTime: dbCheck.rows[0].now
            }
        });
    } catch (error) {
        console.error('❌ Database connection issue:', error.stack);
        res.status(500).json({
            status: "⚠️ Server is running, but database connection failed",
            currentTime,
            database: {
                status: "❌ Not connected",
                error: error.message
            }
        });
    }
});

// ==============================
// ✅ POST /api/content
// ==============================

/**
 * ✅ POST /api/content
 * Adds new content to the "contents" table in the database
 */
app.post('/api/content', async (req, res) => {
    const { content } = req.body;  // Extract the content from the request body

    if (!content) {
        return res.status(400).send({ error: '⚠️ Content is required' });
    }

    try {
        // Insert the content into the "contents" table
        const result = await client.query('INSERT INTO contents (content) VALUES ($1) RETURNING *', [content]);
        const newContent = result.rows[0]; // Get the inserted content

        res.status(201).json(newContent); // Respond with the inserted content
    } catch (error) {
        console.error('❌ Error adding content:', error.stack);
        res.status(500).send({ error: '❌ Internal Server Error' });
    }
});

// ==============================
// ✅ GET /api/content
// ==============================

/**
 * ✅ GET /api/content
 * Retrieves all content from the "contents" table in the database
 */
app.get('/api/content', async (req, res) => {
    try {
        // Retrieve all content from the database, ordered by creation timestamp
        const result = await client.query('SELECT * FROM contents ORDER BY created_at DESC');
        const content = result.rows;

        if (content.length === 0) {
            return res.status(404).send({ error: '🔄 No content available' });
        }

        res.json(content); // Respond with the content data
    } catch (error) {
        console.error('❌ Error fetching content:', error.stack);
        res.status(500).send({ error: '❌ Internal Server Error' });
    }
});

// ==============================
// ✅ Catch-All Route for Invalid Endpoints
// ==============================

/**
 * ✅ Catch-All Route for Invalid Endpoints
 * Displays a 404 Not Found message
 */
app.use((req, res) => {
  res.status(404).json({
    error: "❌ Not Found",
    message: `⚠️ The route '${req.originalUrl}' does not exist.`
  });
});

// ==============================
// ✅ Start the Server
// ==============================

app.listen(PORT, () => {
  console.log(`✅ Node.js server is running at http://localhost:${PORT}`);
});