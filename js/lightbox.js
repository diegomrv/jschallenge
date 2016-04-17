var Lightbox = (function() {

	var lightbox = document.getElementById("lightbox");
	var lightbox_bg = document.getElementById("lightbox-bg");
	var modal = document.querySelectorAll("#lightbox .modal")[0];
	var active_photo_container;

	var openLightbox = function(e)
	{
		active_photo_container = e.target.parentElement;

		//Check if we're navigating inside lightbox or opening it
		if(!isOpen()){
			lightbox.className = "lightbox display";
			lightbox_bg.className = "lightbox-bg display";
		}else{
			modal.className = "modal";
			modal.innerHTML = "";
		}
		modal.style = "";
		modal.setAttribute("style","");
		
		//Get large picture url
		var img_url = e.target.src;
		img_url = img_url.slice(0, -5);
		img_url = img_url+"b.jpg"

		//Create image
		var image = document.createElement("IMG");
		image.src = img_url;
		image.title = e.target.title;
		//Create title caption
		var image_title = document.createElement("H3");
		image_title.innerHTML = image.title;
		image_title.className = "right";
		//Create footer
		var footer = document.createElement("DIV");
		footer.className = "footer";
		
		//Create navigation
		var nav = document.createElement("H3");
		nav.className = "left";

		if(active_photo_container.previousSibling !== null){

			var nav_prev = document.createElement("SPAN");
			nav_prev.innerHTML = "< Previous";
			nav.appendChild(nav_prev);
			nav_prev.addEventListener("click", goPrevious);
		}
		if(active_photo_container.previousSibling !== null && active_photo_container.nextSibling !== null){
			nav.appendChild(document.createTextNode(" | "));
		}
		if(active_photo_container.nextSibling !== null){
			var nav_next = document.createElement("SPAN");
			nav_next.innerHTML = "Next >";
			nav_next.className = "previous";
			nav.appendChild(nav_next);
			nav_next.addEventListener("click", goNext);
		}
		footer.appendChild(nav);
		footer.appendChild(image_title);

		//Wait for image load to append and show
		image.onload = function() {
			modal.appendChild(image);
			modal.appendChild(footer);
			if(this.clientWidth < 1000){
				modal.setAttribute("style","width:"+this.width+"px");
				modal.style.width = this.clientWidth+"px";
			}
			modal.className = "modal show";
		}
	}

	var closeLightbox = function(){
        modal.className = "modal";

		//Delay to appreciate css transition
		window.setTimeout(function(){
			modal.innerHTML = "";
			lightbox.className = "lightbox";
			lightbox_bg.className = "lightbox-bg";
		}, 300)

		active_photo_container = undefined;
	}

	var isOpen = function(){
		if(modal.offsetHeight === 0){
			return false;
		}else{
			return true;
		}
	}

	var getActivePhotoContainer = function(){
		return active_photo_container;
	}

	var goPrevious = function(){
		//Simulate click on thumbnail image to use all the code already done for that event
		active_photo_container.previousSibling.children[0].click();
	}

	var goNext = function(){
		active_photo_container.nextSibling.children[0].click();	
	}

	return {
		open: openLightbox,
		close: closeLightbox,
		isOpen: isOpen,
		getActivePhotoContainer: getActivePhotoContainer
	};
})();