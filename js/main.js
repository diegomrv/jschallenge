window.onload = function()
{
	var ajax = Ajax.init();

	ajax.onComplete(function(response)
	{
		var search_data = document.getElementById("search_data");
		var search_text = search_data.querySelectorAll("h2.title span");
		search_text[0].innerHTML = ajax.getSearch();

		displayOnGrid(response);
	})
	.call();

	document.getElementById("load_photos").addEventListener("click", function()
	{	
		ajax.search(document.getElementById("search_text").value)
		.onComplete(function(response)
		{
			var search_data = document.getElementById("search_data");
			var search_text = search_data.querySelectorAll("h2.title span");
			search_text[0].innerHTML = ajax.getSearch();

			displayOnGrid(response);
		})
		.call();
	});

	document.getElementById("load_more").addEventListener("click", function()
	{	
		var clicked = this;

		ajax.options({
			page: clicked.getAttribute('data-page'),
			photos_per_page: clicked.getAttribute('data-perpage')
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
};


function displayOnGrid(response, append = false)
{
	var grid = document.getElementById("photo_grid");
	
	if(!append){
		grid.innerHTML = "";
	}

	var photo_list = response.photo;
	for(var photo_num in photo_list){

		var image = document.createElement("IMG");
		image.src = "https://farm"+photo_list[photo_num].farm+".staticflickr.com/"+photo_list[photo_num].server+"/"+photo_list[photo_num].id+"_"+photo_list[photo_num].secret+"_q.jpg";
		
		var column = document.createElement("DIV");
		column.className = "thumb col";
		column.appendChild(image);
		
		grid.appendChild(column);
	}

	var load_more_button = document.getElementById("load_more");
	load_more_button.setAttribute('data-page', response.page+1)
	load_more_button.setAttribute('data-perpage', response.perpage);
}