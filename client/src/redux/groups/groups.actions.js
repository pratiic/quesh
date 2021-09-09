export const setGroups = (groups) => {
	return {
		type: "SET_GROUPS",
		payload: groups,
	};
};

export const addGroup = (group) => {
	return {
		type: "ADD_GROUP",
		payload: group,
	};
};

export const updateGroup = (groupID, updateInfo) => {
	return {
		type: "UPDATE_GROUP",
		payload: { groupID, updateInfo },
	};
};

export const setLoadingGroups = (loading) => {
	return {
		type: "SET_LOADING_GROUPS",
		payload: loading,
	};
};

export const setGroupsMessage = (message) => {
	return {
		type: "SET_GROUPS_MESSAGE",
		payload: message,
	};
};

export const setMemNum = (groupID, memNum) => {
	return {
		type: "SET_MEM_NUM",
		payload: { groupID, memNum },
	};
};

export const setNeedToFetch = (needToFetch) => {
	return {
		type: "SET_NEED_TO_FETCH",
		payload: needToFetch,
	};
};
