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

	document.getElementById("load_more").addEventListener("click", function()
	{	
		ajax.search(document.getElementById("search_text").value)
		.onLoad(function()
		{

		})
		.onComplete(function(response)
		{
			var search_data = document.getElementById("search_data");
			var search_text = search_data.querySelectorAll("h2.title span");
			search_text[0].innerHTML = ajax.getSearch();

			displayOnGrid(response);
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
}