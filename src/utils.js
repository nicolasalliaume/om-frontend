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
const str = x => String(x);
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

export function getNewInvoiceTemplate() {
	const currentUser = Store.getState().currentUser.user;
	return {
		description 	: '',
		invoicing_date 	: moment().format('YYYY-MM-DD'),
		amount 			: '',
		billed_hours	: '',
		project 		: '',
		paid 			: false,
		created_by 		: currentUser
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

/** attachments */

export function getUrlForAttachmentFile(url) {
	const base = process.env.NODE_ENV === 'production' 
					? 'https://om-integrations.herokuapp.com' : 'http://localhost:3001';
	return base + url;
}
