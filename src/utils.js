import moment from 'moment';

String.prototype.capitalizeFirst = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.trimToWords = function(maxCharLength) {
	if (this.length <= maxCharLength) return this;
	var trimmedString = this.substr(0, maxCharLength);
	trimmedString = trimmedString.substr(0, 
		Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
	return trimmedString + '...';
}

Array.prototype.empty = function() {
	return this.length === 0;
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

export function getNewObjectiveTemplate(level) { return {
	no_task_title 	: '',
	owners 			: [localStorage.getItem('currentUser')],
	objective_date 	: moment().format('YYYY-MM-DD'),
	created_by 		: localStorage.getItem('currentUser'),
	level 			: level,
	progress 		: 0
}}