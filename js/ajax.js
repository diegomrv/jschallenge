var Ajax = (function() {

	var url, onComplete, xhr;
	var options = {
		search: '',
		photos_per_page: 10,
		page: 1
	}

	var init = function(){
		options.search = getDefaultSearch();
		xhr = new XMLHttpRequest();
		return this;
	}

	var call = function() {
		buildUrl();
		xhr.open("GET", url);
		xhr.send();
	}

	var extendOptions = function(user_options) {
		for(var key in user_options){
			options[key] = user_options[key];
		}
		return this;
	}

	var onLoad = function(actions) {
		xhr.addEventListener('loadstart', actions);
		return this;
	}

	var doOnComplete = function() {
		xhr.addEventListener('load', function(e){
			var obj = JSON.parse(xhr.response);
			onComplete(obj.photos);
		});
	}

	var setOnComplete = function(actions) {
		onComplete = actions;
		doOnComplete();
		return this;
	}

	var buildUrl = function(){
		//url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=d1cbdd4b27721ebd877035f83fd52a0d&photoset_id="+options.photoset_id+"&per_page="+options.photos_per_page+"&format=json&nojsoncallback=1";
		url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d1cbdd4b27721ebd877035f83fd52a0d&text="+options.search+"&min_taken_date=2015-01-01&sort=relevance&privacy_filter=1&safe_search=1&content_type=1&per_page="+options.photos_per_page+"&page="+options.page+"&format=json&nojsoncallback=1";
	}

	var getDefaultSearch = function(){
		var default_search_options = ['Vancouver', 'San Francisco', 'Mexico City'];
		var option = Math.floor((Math.random() * 3));
		return default_search_options[option];
	}

	var getSearch = function(){
		return options.search;
	}

	var setSearch = function(search_text){
		options.search = search_text;
		return this;
	}

	return {
		init: init,
		options: extendOptions,
		onLoad: onLoad,
		onComplete: setOnComplete,
		call: call,
		getSearch: getSearch,
		search: setSearch
	};
})();