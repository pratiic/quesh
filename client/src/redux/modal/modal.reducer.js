const INITIAL_STATE = {
	modalInfo: {
		showModal: false,
		modalTitle: "",
		modalChildren: null,
		clickHandler: null,
	},
	closable: true,
};

export const modalReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_MODAL":
			return {
				...state,
				modalInfo: { ...state.modalInfo, ...action.payload },
				closable: action.payload.closable,
			};
		case "SET_CLOSABLE":
			return {
				...state,
				closable: action.payload,
			};
		default:
			return state;
	}
};
