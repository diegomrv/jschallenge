window.onload = function()
{
	//Initiate Flickr API module
	var api = FlickrAPI.init();

	//Request photos with default options
	api.onComplete(function(response)
	{
		var search_data = document.getElementById("search_data");
		var search_text = search_data.querySelectorAll("h2.title span");
		search_text[0].innerHTML = api.getSearch();

		displayOnGrid(response);
	})
	.call();

	//Listen for search form submit to perform new search
	document.getElementById("load_photos").addEventListener("submit", function(event)
	{	
		event.preventDefault();
		search_text = document.getElementById("search_text").value;
		if(search_text != ""){
			//If searchbox wasn't empty, request photos with terms
			api.search(search_text)
			.onComplete(function(response)
			{
				var search_data = document.getElementById("search_data");
				var search_text = search_data.querySelectorAll("h2.title span");
				search_text[0].innerHTML = api.getSearch();

				displayOnGrid(response);
			})
			.call();
		}
	});

	//Listen for "Load more" button to request next pages on current search
	document.getElementById("load_more").addEventListener("click", function()
	{	
		var clicked = this;

		api.options({
			page: clicked.getAttribute('data-page')
		})
		.onLoad(function()
		{
			clicked.innerHTML = "";
			var loader = document.createElement("IMG");
			loader.src = "loader.png";
		
			clicked.appendChild(loader);
		})
		.onComplete(function(response)
		{
			displayOnGrid(response, true);
			clicked.innerHTML = "Load more";
		})
		.call();
	});

	//Listen for click on photo grid but just open lightbox if click was in image
	document.getElementById("photo_grid").addEventListener("click", function(e){
		if (e.target !== e.currentTarget) {
			Lightbox.open(e);
	    }
	    e.stopPropagation();
	});

	//Listen for keyboard events and do stuff on escape, left arrow and right arrow press
	//only if lightbox is open
	document.onkeydown = function(e) {
		if(Lightbox.isOpen()){
			switch (e.keyCode) {
		        case 37:
		            if(Lightbox.getActivePhotoContainer().previousSibling !== null){
		            	//Simulate click on thumbnail image to use all the code already done for that event
		            	Lightbox.getActivePhotoContainer().previousSibling.children[0].click();
		            }
		            break;
		        case 39:
		            if(Lightbox.getActivePhotoContainer().nextSibling !== null){
		            	Lightbox.getActivePhotoContainer().nextSibling.children[0].click();
		            }
		            break;
				case 27:
		            Lightbox.close();
		            break;
		    }
		}
	};

	//Check for click on lightbox to close it, do nothing if click was on modal
	document.getElementById("lightbox").addEventListener("click", function(e){
		if (e.target === e.currentTarget) {
			Lightbox.close();
	    }
	    e.stopPropagation();
	});
};

//Function to display or append photos on grid
function displayOnGrid(response, append = false)
{
	var grid = document.getElementById("photo_grid");
	
	if(!append){
		grid.innerHTML = "";
	}

	var photo_list = response.photo;
	var new_photos = [];
	for(var photo_num in photo_list){

		var image = document.createElement("IMG");
		image.src = "https://farm"+photo_list[photo_num].farm+".staticflickr.com/"+photo_list[photo_num].server+"/"+photo_list[photo_num].id+"_"+photo_list[photo_num].secret+"_q.jpg";
		image.title = photo_list[photo_num].title;
		
		var column = document.createElement("DIV");
		column.className = "thumb col";
		column.appendChild(image);
		
		grid.appendChild(column);
		new_photos.push(column);
	}

	//Delay to appreciate css transition
	window.setTimeout(function(){
		for (i = 0; i < new_photos.length; i++) {
		    new_photos[i].className = "thumb col display";
		}
	}, 300)

	//Add next page to button
	var load_more_button = document.getElementById("load_more");
	load_more_button.setAttribute('data-page', response.page+1);
}
