var xhttp, url, response;
var arrow, menu, ul;

function search() {
	url = window.location.href;
	url = url.split('v=');
	url = url[1];
	while(url.startsWith('-')) url = url.slice(1);

	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() { handleStateChange(); }
	xhttp.open('GET', 'https://www.reddit.com/search.json?q=url%3A' + url + '&sort=top&t=all&limit=3', true);
	xhttp.send();
}

function handleStateChange() {
	if(xhttp.readyState == 4) {
		response = JSON.parse(xhttp.responseText);
		handleResponse(response.data.children);
	}
}

function handleResponse(r) {
	var date, result;

	date = Math.floor(Date.now() / 1000);
	if(r[0]) { result = [r[0]]; } else { result = []; }

	for(var et in r) {
		if(date - 7200 < r[et].data.created_utc || r[et].data.score > 300) {
			try {
				for(var i in result) { if(result[i].data.subreddit == r[et].data.subreddit) { throw "subreddit duplicate"; } }
				result.push(r[et]);
			} catch(e) {
				console.log(e);
			}
		}
	}
	if(result.length > 1) {
		btn.className += " yt-uix-menu-trigger";

		arrow = document.createElement('span');
		arrow.className = "yt-uix-button-arrow yt-sprite";
		btn.appendChild(arrow);

		menu = document.createElement('div');
		menu.className = "yt-uix-menu-content yt-ui-menu-content yt-uix-kdb-nav yt-uix-menu-hidden yt-uix-kbd-nav yt-uix-menu-content-hidden";
		container.appendChild(menu);

		ul = document.createElement('ul');
		menu.appendChild(ul);

		for(var i in result) {
			var li = document.createElement('li');
			ul.appendChild(li);

			var menuItem = document.createElement('button');
			menuItem.className = "yt-ui-menu-item yt-ui-menu-close-on-select";
			menuItem.setAttribute('onclick', permalink(result[i].data.permalink));
			li.appendChild(menuItem);

			var option = document.createElement('span');
			option.className = "yt-ui-menu-item-label"
			option.innerHTML = 'r/' + result[i].data.subreddit + ', ' + result[i].data.score;
			menuItem.appendChild(option);

		}
	} else if(result.length == 1) {
		btn.setAttribute('title', 'r/' + result[0].data.subreddit);
		btn.firstChild.innerHTML = 'r/' + result[0].data.subreddit;
		btn.onclick = function() { window.open('https://reddit.com' + result[0].data.permalink) };
	} else {
		var title, link;

		title = document.getElementById('eow-title').innerHTML;
		link = window.location.href;

		btn.className += " yt-uix-button-has-icon no-icon-markup action-panel-trigger-share";
		btn.onclick = function() { window.open('https://reddit.com' + '/r/videos' + '/submit' + '?title=' + title + '&url=' + link)}
		btn.setAttribute('title', 'Share on Reddit');
	}

	function permalink(param) {
		return "window.open('https://reddit.com" + param + "')";
	}
}
