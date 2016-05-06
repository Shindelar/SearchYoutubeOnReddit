function create(tagName, attributes, content) {
	var element = document.createElement(tagName);
	for(var key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
	if(content) element.innerHTML = content;
	return element;
}