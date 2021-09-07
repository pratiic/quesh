const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

//initializing server
const app = express();

//connecting to the database
mongoose.connect(
	process.env.MONGO_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log("connected to the database successfully");
	}
);

//middlewares
app.use(express.json());
app.use(cors());

app.use("/api/user", require("./routes/auth"));
app.use("/api/group", require("./routes/group"));
app.use("/api/question", require("./routes/question"));
app.use("/api/solution", require("./routes/solution"));
app.use("/api/user", require("./routes/user"));

//defining port number
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (request, response) => {
		response.sendFile(
			path.resolve(__dirname, "client", "build", "index.html")
		);
	});
}

app.listen(port, () => {
	console.log(`the server is listening at the port ${port}`);
});
