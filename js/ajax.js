var Ajax = (function() {

	var default_options = {
		photoset_id: '72157633553599346',
		photos_per_page: 10
	}
	var url, onComplete;
	var xhr = new XMLHttpRequest();

	var call = function() {
		buildUrl();
		xhr.open("GET", url);
		xhr.send();
	}

	var extendOptions = function(user_options) {
		for(var key in user_options){
			default_options[key] = user_options[key];
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
			onComplete(obj.photoset);
		});
	}

	var setOnComplete = function(actions) {
		onComplete = actions;
		doOnComplete();
		return this;
	}

	var buildUrl = function(){
		url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=d1cbdd4b27721ebd877035f83fd52a0d&photoset_id="+default_options.photoset_id+"&per_page="+default_options.photos_per_page+"&format=json&nojsoncallback=1";
	}

	return {
		options: extendOptions,
		onLoad: onLoad,
		onComplete: setOnComplete,
		call: call
	};
})();