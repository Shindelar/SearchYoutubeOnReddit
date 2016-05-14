// return DOM element given the parameters
var create = function (tagName, attributes, text) {
	var element = document.createElement(tagName);
	for(var key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
	if(text) element.innerHTML = text;
	return element;
}
// append children given an array
Element.prototype.appendChildren = function(a) { a.forEach(e => {this.appendChild(e)}) };
// send xmlhttp request
var sendRequest = function (url, callback) {
	xhttp = new XMLHttpRequest();
	// handles state change
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState == 4) callback(shorten(xhttp.response)); //handleResponse(response.data.children);
	};
	xhttp.responseType = "json";
	xhttp.timeout = 4000;
	xhttp.open('GET', url, true);
	xhttp.send();
}
// shorten response, return subreddits
var shorten = function(response) {
	switch(typeof response) {
		case "object":
			return response.data.children.map(e => ({
				created_utc: e.data.created_utc,
				permalink: e.data.permalink,
				subreddit: e.data.subreddit,
				upvotes: e.data.score
			})).filter((e,i,a) => duplicate(e,i,a,"subreddit"))
			.filter((e,i) => noUpvotes(e,i));
		default:
			return null;
	}
	function duplicate(element, index, array, key) {
		// ignore first element
		if(index) {
			for(let i = 0; i < array.length; i++) {
				if(array[i][key] === element[key] && i < index) {
					return false;
				}
			}
		}
		return true;
	}
	function noUpvotes(element, index) {
		if(index && element.upvotes < 300 && element.created_utc + 7200 < Date.now() / 1000) {
			return false;
		}
		return true;
	}
}