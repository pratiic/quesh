const INITIAL_STATE = {
	questions: [],
	groupID: "",
	sortBy: "time",
	activeQuestion: null,
};

export const groupQuestionsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_GROUP_QUESTIONS":
			return {
				...state,
				questions: action.payload.questions,
				groupID: action.payload.groupID,
			};
		case "ADD_GROUP_QUESTION":
			return {
				...state,
				questions: [action.payload, ...state.questions],
			};
		case "SET_GROUP_ID":
			return {
				...state,
				groupID: action.payload.groupID,
			};
		case "UPDATE_GROUP_QUESTION":
			return {
				...state,
				questions: state.questions.map((question) => {
					if (question._id === action.payload.questionID) {
						return { ...question, ...action.payload.updateInfo };
					}

					return question;
				}),
			};
		case "SET_SORT_TYPE":
			return { ...state, sortBy: action.payload };
		case "SET_ACTIVE_QUESTION":
			return { ...state, activeQuestion: action.payload };
		case "RESET_GROUP_QUESTIONS":
			return { ...INITIAL_STATE };
		default:
			return state;
	}
};
