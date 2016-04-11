var parent, container, btn, content;

onReady = function(callback) {
	if (document.readyState === "complete")
		window.setTimeout(callback, 0);
	else
		window.addEventListener("load", callback, false);
};

onReady(function() {
	addBtn();
	document.getElementsByTagName('video')[0].onloadstart = function() {
		addBtn();
	}
});

function addBtn() {
	if(document.getElementById('watch8-action-buttons')) {
			content = document.createElement('span');
			content.className = "yt-uix-button-content";
			content.innerHTML = 'Reddit Thread';

			btn = document.createElement('button');
			btn.className = "yt-uix-button yt-uix-button-default yt-uix-tooltip reddit-default-btn";
			btn.appendChild(content);

			container = document.createElement('div');
			container.className = "yt-uix-menu";
			container.id = "redditSearch";
			container.appendChild(btn);

			parent = document.getElementById('watch8-secondary-actions');
			parent.appendChild(container);

			search();
	}
}