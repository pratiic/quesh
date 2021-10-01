const express = require("express");

const Image = require("../models/Image");

const router = express.Router();

//get an image
router.get("/:randomString", async (request, response) => {
	let options = null;

	const userID = request.query.userID;
	const questionID = request.query.questionID;

	if (userID) {
		options = { user: userID };
	}

	if (questionID) {
		options = {
			question: questionID,
			randomStr: request.params.randomString,
		};
	}

	try {
		const image = await Image.findOne(options);

		if (!image) {
			return response.status(400).send({ error: "image not found" });
		}

		response.set("Content-Type", "image/jpg");

		response.send(image.binary);
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

module.exports = router;
