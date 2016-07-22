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
	var parent = document.getElementById('watch8-secondary-actions'),
		url = window.location.href,
		videoId = getVideoId(url),
		request;
	if(parent) {
		request = "https://www.reddit.com/search.json?q=" +
			encodeURIComponent("url:(" + videoId + " OR u=%2Fwatch%3Fv%3D" + videoId + ") site:(youtube.com OR youtu.be)") +
			"&sort=top&t=all&limit=3";
		parent.appendChild(create('div', container))
			.appendChild(create('button', btn))
			.appendChild(create('span', content, 'Reddit Thread'));

		sendRequest(request, handleResponse, true);
	}
}
function handleResponse(response) {
	var container = document.getElementById('redditSearch'),
		btn = container.firstChild,
		title = document.getElementById('eow-title').innerHTML;
	switch(response.length) {
		case 3:
		case 2:
			btn.className += " yt-uix-menu-trigger";
			btn.appendChild(create('span', {"class": "yt-uix-button-arrow yt-sprite" }));
			container.appendChild(create('div',
					{'class': 'yt-uix-menu-content yt-ui-menu-content yt-uix-kdb-nav yt-uix-menu-hidden yt-uix-kbd-nav yt-uix-menu-content-hidden'}))
				.appendChild(create('ul'))
				.appendChildren(
					response.map(e => {
						var element =  create('li');
						element.appendChild(create('button', {'class': 'yt-ui-menu-item yt-ui-menu-close-on-select',
								'onclick': permalink(e.permalink)}))
							.appendChild(create('span', {'class': 'yt-ui-menu-item-label'},
								'r/' + e.subreddit + ', ' + e.upvotes));
						return element;
					})
				);
			break;
		case 1:
			btn.setAttribute('onclick', permalink(response[0].permalink));
			btn.setAttribute('title', 'r/' + response[0].subreddit);
			btn.firstChild.innerHTML = 'r/' + response[0].subreddit;
			break;
		default:
			title = title.trim().replace(/&amp;/g, '&');
			title = encodeURIComponent(title).replace("'", "%27");
			btn.setAttribute('onclick', permalink('/submit?title=' + title + '&url=' + encodeURIComponent(window.location.href)));
			btn.className += " yt-uix-button-has-icon no-icon-markup action-panel-trigger-share";
			btn.setAttribute('title', 'Share on Reddit');
	}
	function permalink(v) {
		return "window.open('https://reddit.com" + v + "')";
	}
}