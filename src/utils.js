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

/* numbers to words */
const arr = x => Array.from(x);
const num = x => Number(x) || 0;
const isEmpty = xs => xs.length === 0;
const take = n => xs => xs.slice(0,n);
const drop = n => xs => xs.slice(n);
const reverse = xs => xs.slice(0).reverse();
const comp = f => g => x => f (g (x));
const not = x => !x;
const chunk = n => xs =>
  isEmpty(xs) ? [] : [take(n)(xs), ...chunk (n) (drop (n) (xs))];

// numToWords :: (Number a, String a) => a -> String
export function numToWords(n) {
  let a = [
    '', 'one', 'two', 'three', 'four',
    'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
    'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
  ];
  let b = [
    '', '', 'twenty', 'thirty', 'forty',
    'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
  ];
  let g = [
    '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
    'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'
  ];
  let makeGroup = ([ones,tens,huns]) => {
    return [
      num(huns) === 0 ? '' : a[huns] + ' hundred ',
      num(ones) === 0 ? b[tens] : b[tens] && b[tens] + '-' || '',
      a[tens+ones] || a[ones]
    ].join('');
  };
  let thousand = (group,i) => group === '' ? group : `${group} ${g[i]}`;
  
  if (typeof n === 'number')
    return numToWords(String(n));
  else if (n === '0')
    return 'zero';
  else
    return comp (chunk(3)) (reverse) (arr(n))
      .map(makeGroup)
      .map(thousand)
      .filter(comp(not)(isEmpty))
      .reverse()
      .join(' ');
};

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

export function encodeProjectName(name) {
	return name.toLowerCase().replace(/-/g, '=').replace(/\s/i, "-");
}

export function decodeProjectName(name) {
	return name.toLowerCase().replace(/-/g, ' ').replace(/=/g, '-');
}

export function getProjectIdFromEncodedName(encodedName, projectsById) {
	const name = decodeProjectName(encodedName);
	const matches = Object.values(projectsById).filter(
			p => p.name.toLowerCase() === name);
	return matches.length > 0 ? matches[0]._id : null;
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

export function getNewIntegrationTemplate() {
	return {
		name 		: 'New integration',
		service 	: 'trello',
		mappings	: { project : '' },
		meta 		: {}
	}
}

export function getNewInvoiceTemplate(direction = 'out') {
	const currentUser = Store.getState().currentUser.user;
	return {
		description 	: '',
		invoicing_date 	: moment().format('YYYY-MM-DD'),
		amount 			: '',
		billed_hours	: '',
		project 		: '',
		receiver		: '',
		paid 			: false,
		created_by 		: currentUser,
		attachment 		: null,
		direction
	}
}

export function getNewUserTemplate() {
	return {
		username 		: '',
		first_name 		: '',
		last_name		: '',
		profile_image 	: '',
		email 			: '',
		trello_account	: '',
		slack_account	: '',
		git_account		: ''
	}
}

export function getNewAlarmTemplate() {
	const currentUser = Store.getState().currentUser.user;
	return {
		name: 'New alarm',
		created_by: currentUser,
		enabled: true,
		measure: '',
		user_filter: '',
		project_filter: '',
		date_filter: '',
		state_filter: '',
		condition_op: '>',
		condition_value: 0,
	}
}

/** attachments */

export function getUrlForAttachmentFile(url) {
	const base = process.env.NODE_ENV === 'production' 
					? 'https://om-integrations.herokuapp.com' : 'http://localhost:3001';
	return base + url;
}

export function getUrlForInvoiceAttachment(url) {
	const base = process.env.NODE_ENV === 'production' 
					? 'https://om-services.herokuapp.com/attachments/' : 'http://localhost:3000/attachments/';
	return base + url;
}

/** date formats */

export function setShortDateFormat() {
	moment.locale('en', {
		relativeTime: {
		  future: 'in %s',
		  past: '%s',
		  s:  '1s',
		  ss: '%ss',
		  m:  '1m',
		  mm: '%dm',
		  h:  '1h',
		  hh: '%dh',
		  d:  '1d',
		  dd: '%dd',
		  M:  '1 month',
		  MM: '%d months',
		  y:  '1y',
		  yy: '%dy'
		}
	})
}

export function setLongDateFormat() {
	moment.locale('en', {
		relativeTime: {
		  future: 'in %s',
		  past: '%s',
		  s:  '1 second',
		  ss: '%s seconds',
		  m:  '1 minute',
		  mm: '%d minutes',
		  h:  '1 hour',
		  hh: '%d hours',
		  d:  '1 day',
		  dd: '%d days',
		  M:  '1 month',
		  MM: '%d months',
		  y:  '1 year',
		  yy: '%d years'
		}
	})
}
