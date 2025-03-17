import express from 'express';
import { authMiddleware } from '../middleware/protectRoute.js';
import pool from '../models/db.js';

const router = express.Router();


const dashboard = router.get('/', authMiddleware, async (req, res) => {
	try {
		// get the currently authenticated userId from the middleware

		const user = await pool.query('SELECT user_name FROM users WHERE user_id = $1', [req.user]);
		res.json(user.rows[0]);
	} catch (error) {
		console.error("Error in dashboard route:", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
})

export default dashboard;
