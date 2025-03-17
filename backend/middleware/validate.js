const validateInfo = (req, res, next) => {
	const { email, name, password } = req.body;


	if (req.path === "/register") {
		if (!email || !name || !password) {
			return res.status(400).json({ error: "Missing required fields" });
		}

	} else {
		if (!email || !password) {
			return res.status(400).json({ error: "Missing required fields" })
		}
	}



	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return res.status(400).json({ error: "Invalid email format" });
	}

	next();
};

export default validateInfo;
