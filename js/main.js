window.onload = function() {

	Ajax.options({
		photos_per_page: 5
	})
	.onLoad(function() {

		var main_content = document.getElementById("container");
		main_content.innerHTML = main_content.innerHTML + 'Loading...';
	})
	.onComplete(function(response){

		var grid = document.getElementById("photo_grid");
		var photo_list = response.photo;
		for(var photo_num in photo_list){
			
			var image = document.createElement("IMG");
			image.src = "https://farm"+photo_list[photo_num].farm+".staticflickr.com/"+photo_list[photo_num].server+"/"+photo_list[photo_num].id+"_"+photo_list[photo_num].secret+"_q.jpg";
			var node = document.createElement("LI").appendChild(image);
			grid.appendChild(node);
		}
	})
	.call();
};