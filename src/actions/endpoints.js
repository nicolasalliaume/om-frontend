import moment from 'moment';

const BASE_URL = `${process.env.REACT_APP_OM_SERVICES_URL}/api/${process.env.REACT_APP_OM_API_VERSION}`;
const TZ = moment().format( 'Z' );

export const Endpoints = {

	/** objective endpoins */
	GET_DATE_OBJECTIVES 			: ( year, month, day ) => `${BASE_URL}/objectives/${year}/${month}/${day}/all?tz=${TZ}`,
	GET_OBJECTIVES_SUMMARY 			: ( year, month, day ) => `${BASE_URL}/objectives/${year}/${month}/${day}/summary?tz=${TZ}`,
	CREATE_OBJECTIVE 				: () => `${BASE_URL}/objectives/add`,
	UPDATE_OBJECTIVE 				: ( objectiveId ) => `${BASE_URL}/objectives/${objectiveId}`,
	DELETE_OBJECTIVE				: ( objectiveId ) => `${BASE_URL}/objectives/${objectiveId}`,
	GET_OBJECTIVE_WORK_ENTRIES 		: ( objectiveId ) => `${BASE_URL}/objectives/${objectiveId}/work-entries`,
	CREATE_OBJECTIVE_WORK_ENTRY		: ( objectiveId ) => `${BASE_URL}/objectives/${objectiveId}/work-entries/add`,
	QUERY_OBJECTIVES				: ( query ) => `${BASE_URL}/objectives/query?${encode( query )}`,

	/** task endopoins */
	GET_TASKS_LIST_PAGE 			: ( page, filters ) => `${BASE_URL}/tasks/list/${page}?${toQueryString( filters )}`,
	GET_TASK						: ( taskId ) => `${BASE_URL}/tasks/${taskId}`,
	ADD_TASK						: () => `${BASE_URL}/tasks/add`,
	UPDATE_TASK						: ( taskId ) => `${BASE_URL}/tasks/${taskId}`,
	DELETE_TASK						: ( taskId ) => `${BASE_URL}/tasks/${taskId}`,

	/** activity endpoints */
	GET_LATEST_ACTIVITY_PAGE 		: ( page ) => `${BASE_URL}/activity/${page}`,

	/** user endpoints */
	GET_USERS_LIST					: () => `${BASE_URL}/users`,
	AUTH_USER_LINK					: () => `${BASE_URL}/users/auth-link`,
	CREATE_USER						: () => `${BASE_URL}/users/add`,
	UPDATE_USER						: ( userId ) => `${BASE_URL}/users/${userId}`,
	DELETE_USER						: ( userId ) => `${BASE_URL}/users/${userId}`,
	RENDER_WORK_ENTRIES_FOR_USER	: ( userId, filters ) => `${BASE_URL}/users/${userId}/work-entries/export/html?${encode( filters )}`,

	/** project endpoints */
	GET_PROJECTS_LIST				: () => `${BASE_URL}/projects`,
	GET_WORK_ENTRIES_FOR_PROJECT	: ( projectId, filters ) => `${BASE_URL}/projects/${projectId}/work-entries?${encode( filters )}`,
	GET_WORK_ENTRIES_FOR_USER		: ( userId, filters ) => `${BASE_URL}/users/${userId}/work-entries?${encode( filters )}`,
	ADD_PROJECT						: () => `${BASE_URL}/projects/add`,
	DELETE_PROJECT					: ( projectId ) => `${BASE_URL}/projects/${projectId}`,
	UPDATE_PROJECT					: ( projectId ) => `${BASE_URL}/projects/${projectId}`,
	RENDER_WORK_ENTRIES_FOR_PROJECT	: ( projectId, filters ) => `${BASE_URL}/projects/${projectId}/work-entries/export/detailed/html?${encode( filters )}`,
	RENDER_PROJECT_STATUS_FOR_CLIENT: ( projectId, filters ) => `${BASE_URL}/projects/${projectId}/work-entries/export/client/html?${encode( filters )}`,

	/** billing endpoints */
	GET_INVOICES_LIST				: () => `${BASE_URL}/billing/invoices`,
	GET_PROJECTS_BILLING			: () => `${BASE_URL}/billing/projects`,
	GET_BILLING_FOR_PROJECT			: ( projectId ) => `${BASE_URL}/billing/projects/${projectId}`,
	GET_INVOICES_WITH_QUERY			: ( filters ) => `${BASE_URL}/billing/invoices/query?${encode( filters )}`,

	/** planning endpoints */
	GET_PLANNING_OBJECT				: ( name ) => `${BASE_URL}/planning/${ name }`,

	/** admin endpoints */
	GET_INTEGRATIONS				: () => `${BASE_URL}/admin/integrations`,
	CREATE_INTEGRATION				: () => `${BASE_URL}/admin/integrations/add`,
	UPDATE_INTEGRATION				: ( integrationId ) => `${BASE_URL}/admin/integrations/${integrationId}`,
	DELETE_INTEGRATION				: ( integrationId ) => `${BASE_URL}/admin/integrations/${integrationId}`,
	ADD_INVOICE						: () => `${BASE_URL}/billing/invoices/add-invoice`,
	UPDATE_INVOICE					: ( invoiceId ) => `${BASE_URL}/billing/invoices/${invoiceId}`,
	DELETE_INVOICE					: ( invoiceId ) => `${BASE_URL}/billing/invoices/${invoiceId}`,
	RENDER_INVOICE					: ( invoiceId ) => `${BASE_URL}/billing/invoices/${invoiceId}/html?`,
	GET_ALARMS						: () => `${BASE_URL}/admin/alarms`,
	CREATE_ALARM					: () => `${BASE_URL}/admin/alarms/add`,
	UPDATE_ALARM					: ( alarmId ) => `${BASE_URL}/admin/alarms/${alarmId}`,
	DELETE_ALARM					: ( alarmId ) => `${BASE_URL}/admin/alarms/${alarmId}`,
};

export const EndpointAuth = () => { 
	return [ 'Authorization', 'Basic: ' + localStorage.getItem( 'om-auth-token' ) ];
};

export const EndpointAuthQuerystring = () => {
	return '&authtoken=' + localStorage.getItem( 'om-auth-token' );
};

export function testForErrorReturned( body ) {
	if ( body.error ) {
		throw new Error( body.error );
	}
	return body;
}


function encode( obj, key ) {
	// final step
	if ( typeof obj !== 'object' ) {
		return `${key}=${obj}`;
	}
	// recursive step
	return Object.keys( obj )
		// encode each child prop
		.map( k => {
			const _key = key ? key + '[' + k + ']' : k;
			return encode( obj[k], _key );
		} )
		.join( '&' );
}


function toQueryString( obj ) {
	// skip empty or null fields
	const validKeys = Object.keys( obj ).filter( k => !!obj[k] );
	return validKeys.map( k => `${encodeURIComponent( k )}=${encodeURIComponent( obj[k] )}` ).join( '&' );
}
