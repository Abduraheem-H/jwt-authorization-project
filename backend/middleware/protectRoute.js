import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

export const authMiddleware = async (req, res, next) => {
	try {

		const token = req.header("token");
		// Check if token exists

		if (!token) {
			return res.status(403).json({ error: "Not Authorized" });
		}

		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload.user;

		next(); // Move to next middleware
	} catch (error) {
		console.error("Error in authMiddleware:", error.message);
		return res.status(403).json({ error: "Invalid or Expired Token" });
	}
};
