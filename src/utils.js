
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