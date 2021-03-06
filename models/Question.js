const mongoose = require("mongoose");

//creating a schema for question
const questionSchema = new mongoose.Schema(
	{
		description: String,
		about: {
			type: Array,
			default: [],
		},
		title: {
			type: String,
			default: "",
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		group: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Group",
			default: null,
		},
		images: {
			type: Array,
			default: [],
		},
		solution: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Solution",
			default: null,
		},
		proposedSolutions: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Solution",
					default: null,
				},
			],
			default: [],
		},
		votes: { type: Array, default: [] },
		votesNumber: { type: Number, default: 0 },
		solved: { type: Boolean, default: false },
	},
	{ timestamps: true },
	{ _id: false }
);

module.exports = mongoose.model("Question", questionSchema);
