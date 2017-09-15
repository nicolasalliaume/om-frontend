
const BASE_URL = 'http://localhost:3000/api/1.0'

export const Endpoints = {

	/** objective endpoins */
	GET_DATE_OBJECTIVES 		: (year, month, day) => `${BASE_URL}/objectives/${year}/${month}/${day}/all`,
	CREATE_OBJECTIVE 			: () => `${BASE_URL}/objectives/add`,
	UPDATE_OBJECTIVE 			: (objectiveId) => `${BASE_URL}/objectives/${objectiveId}`,

	/** task endopoins */
	GET_TASKS_LIST_PAGE 		: (page) => `${BASE_URL}/tasks/${page}`,
	ADD_TASK					: () => `${BASE_URL}/tasks/add`,

	/** activity endpoints */
	GET_LATEST_ACTIVITY_PAGE 	: (page) => `${BASE_URL}/activity/${page}`,

	/** user endpoints */
	GET_USERS_LIST				: () => `${BASE_URL}/users`
}

export const EndpointAuth = ['Authorization', 'Basic: c29tZXVzZXJuYW1l:c29tZXB3ZA=='];