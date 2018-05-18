import { SET_AFTER_LOGIN_REDIRECTION } from './types';

export function setAfterLoginRedirection(url) {
	return { type: SET_AFTER_LOGIN_REDIRECTION, payload: url }
}