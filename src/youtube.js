// attributes of DOM elements
var container = {
		"class": "yt-uix-menu",
		"id": "redditSearch" },
	btn = {
		"class": "yt-uix-button yt-uix-button-default yt-uix-tooltip reddit-default-btn" },
	content = {
		"class": "yt-uix-button-content" };

window.addEventListener('load', function() {
	addBtn() }, false);

document.addEventListener('spfdone', function() {
	addBtn() }, false);

// appends button to youtube UI
function addBtn() {
	var parent = document.getElementById('watch8-secondary-actions');
	if(parent) {
		parent.appendChild(create('div', container))
			.appendChild(create('button', btn))
			.appendChild(create('span', content, 'Reddit Thread'));

		search();
	}
}