const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(
	cors({
		origin: "*",
	}),
);

// Route
app.get("/api/classify", async (req, res) => {
	try {
		const { name } = req.query;

		// Validation
		if (name === undefined || (typeof name === "string" && name.trim() === "")) {
			return res.status(400).json({
				status: "error",
				message: "Missing or empty name query parameter",
			});
		}

		if (typeof name !== "string") {
			return res.status(422).json({
				status: "error",
				message: "Non-string name query parameter",
			});
		}

		// Call Genderize API
		const response = await axios.get(`https://api.genderize.io/?name=${name}`);

		const { gender, probability, count } = response.data;

		// Edge case: Genderize API returns gender null or count 0 if no prediction found
		if (!gender || count === 0) {
			return res.status(400).json({
				status: "error",
				message: "No prediction available for the provided name",
			});
		}

		// Process data
		const result = {
			status: "success",
			data: {
				name,
				gender,
				probability,
				sample_size: count,
				is_confident: probability >= 0.7 && count >= 100,
				processed_at: new Date().toISOString(),
			},
		};

		res.json(result);
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "Internal server error",
		});
	}
});

// Start server
app.listen(3000, () => {
	console.log("Server running on port 3000");
});
