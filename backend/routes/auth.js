import express from 'express';
import pool from '../models/db.js';
import bcrypt from 'bcryptjs';
import jwtGenerator from '../utils/jwtgenerator.js';
import validateInfo from '../middleware/validate.js';
import { authMiddleware } from '../middleware/protectRoute.js';


const router = express.Router();

//register routes
router.post('/register', validateInfo, async (req, res) => {
	const { name, email, password } = req.body;
	//console.log(req.body);
	try {

		// Check if the user already exists
		const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);
		if (user.rows.length > 0) {
			return res.status(400).json({ error: 'User already exists' });
		}

		const salt = bcrypt.genSaltSync(10);
		const hashed_password = bcrypt.hashSync(password, salt);

		const newUser = await pool.query('INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING*', [name, email, hashed_password]);

		// Return the jwt token

		const jwtToken = jwtGenerator(newUser.rows[0].user_id);
		return res.status(201).json({ jwtToken });

	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
		console.error("Error in register route ", error.message);
	}
})

// Login routes

router.post('/login', validateInfo, async (req, res) => {
	const { email, password } = req.body;
	try {
		// Check if the user exists
		const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);
		if (user.rows.length === 0) {
			return res.status(401).json({ error: 'Invalid Credentials' });
		}

		// Check if the password is correct
		const validPassword = bcrypt.compareSync(password, user.rows[0].user_password);
		if (!validPassword) {
			return res.status(401).json({ error: 'Invalid Credentials' });
		}

		// Return the jwt token
		const jwtToken = jwtGenerator(user.rows[0].user_id);
		return res.status(200).json({ jwtToken });

	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
		console.error("Error in login route ", error.message);
	}
})


// Verify route
router.get('/verify', authMiddleware, async (req, res) => {
	try {
		res.json(true);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
		console.error("Error in verify route ", error.message);
	}
});

export default router; // Export the router