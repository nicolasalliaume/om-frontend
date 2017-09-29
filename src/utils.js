import moment from 'moment';
import Store from './store';

/*jshint freeze: false */
String.prototype.capitalizeFirst = function() { 
	return this.charAt(0).toUpperCase() + this.slice(1);
}

/*jshint freeze: false */
String.prototype.trimToWords = function(maxCharLength) { 
	if (this.length <= maxCharLength) return this;
	var trimmedString = this.substr(0, maxCharLength);
	trimmedString = trimmedString.substr(0, 
		Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
	return trimmedString + '...';
}

/*jshint freeze: false */
Array.prototype.empty = function() { 
	return this.length === 0;
}

//The maximum is inclusive and the minimum is inclusive 
export function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getPaginationBarFirstAndLastVisiblePages(visiblePage, totalPages) {
	let first = 1, last = 1;
	if (totalPages < 11) { last = totalPages }
	else {
		first = visiblePage - 5;
		last = visiblePage + 5;
		if (first < 1) {
			last += 1 - first;
			first = 1;
		}
		else if (last > totalPages) {
			first -= last - totalPages;
			last = totalPages;
		}
	}
	return [first, last];
}

/** object templates */

export function getNewObjectiveTemplate(level) { 
	// can assume there's a current user if you got here
	const currentUser = Store.getState().currentUser.user;
	return {
		no_task_title 	: '',
		owners 			: [currentUser],
		objective_date 	: moment().format('YYYY-MM-DD'),
		created_by 		: currentUser,
		level 			: level,
		progress 		: 0
	}
}

/** attachments */

export function getUrlForAttachmentFile(url) {
	const base = process.env.NODE_ENV === 'production' 
					? 'https://om-integrations.herokuapp.com' : 'http://localhost:3001';
	return base + url;
}
