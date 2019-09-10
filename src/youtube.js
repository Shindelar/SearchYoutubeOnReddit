// attributes of DOM elements
var container = {
		'id': 'rst-button',
		'class': 'rst-info-renderer' },
	renderer = {
		'class': '' },
	btn = {
		'noink': '',
		'class': 'style-scope ytd-subscribe-button-renderer',
		'role': 'button',
		'tabindex': '0',
		'animated': '',
		'elevation': '0',
		'aria-disabled': 'false',
		'subscribed': '',
		'aria-label': ''};

var _listener = function(permalink) {
	return () => { 
		window.open(`https://reddit.com${permalink}`);
	}
}

document.addEventListener('yt-page-data-updated', function() {
	addBtn() }, false);

// appends button to youtube UI
function addBtn() {
	var parent = document.querySelector('ytd-video-owner-renderer'),
		url = window.location.href,
		videoId = getVideoId(url),
		request;
	if(parent) {
		request = "https://www.reddit.com/search.json?q=" +
			encodeURIComponent("url:(" + videoId + " OR u=%2Fwatch%3Fv%3D" + videoId + ") site:(youtube.com OR youtu.be)") +
			"&sort=top&t=all&limit=3";
		
		if(document.querySelector('ytd-video-owner-renderer #rst-button')) {
			document.querySelector('ytd-video-owner-renderer #rst-button').remove();
		}

		parent.insertBefore(createDOMElement('div', container), document.querySelector('div#meta div#sponsor-button'))
				.appendChild(createDOMElement('rst-button-renderer', renderer))
				.appendChild(createDOMElement('paper-button', btn, 'Reddit'));
		
		sendRequest(request, handleResponse, true);
	}
}
function handleResponse(response) {
	let btn = document.querySelector('div#rst-button paper-button');
	let title = document.querySelector('div#info h1.title').innerText;

	switch(response.length) {
		case 3:
		case 2:
		case 1:
			btn.addEventListener('click', _listener(response[0].permalink));
			btn.setAttribute('title', `r/${response[0].subreddit}`);
			btn.innerText = `r/${response[0].subreddit} (${response[0].upvotes})`;
			break;
		default:
			title = title.trim().replace(/&amp;/g, '&');
			title = encodeURIComponent(title).replace("'", "%27");

			btn.addEventListener('click', _listener(`/submit?title=${title}&url=${encodeURIComponent(window.location.href)}`));
			btn.setAttribute('title', 'Share on Reddit');
			btn.innerText = 'Reddit';
	}
}
