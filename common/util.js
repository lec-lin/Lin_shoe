function arrayColumn(name, arr) {
	var ret = []
	for (var i = 0, len = arr.length; i < len; i++) {
		ret.push(arr[i][name])
	}
	return ret;
}

function removeImgStyle(htmlText) {
	let str = htmlText.replace(/<img[^>]*>/gi, function(match, capture) {
		return match.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/ig, 'style="max-width:100%;"')
	})
	return str;
}

export default {
	arrayColumn,
	removeImgStyle
};
