import { ADD_MESSAGE, ADD_ERROR, DISMISS_MESSAGE } from './types';

export function addMessage(message, title) {
	return { type: ADD_MESSAGE, payload : { message, title } }
}

export function addError(message, title) {
	return { type: ADD_ERROR, payload : { message, title } }
}

export function dismissMessage() {
	return { type: DISMISS_MESSAGE }
}