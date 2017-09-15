
String.prototype.capitalizeFirst = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

Array.prototype.empty = function() {
	return this.length === 0;
}