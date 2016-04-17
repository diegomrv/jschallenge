var Lightbox = (function() {

	var lightbox = document.getElementById("lightbox");
	var lightbox_bg = document.getElementById("lightbox-bg");
	var modal = document.querySelectorAll("#lightbox .modal")[0];

	var openLightbox = function(e){

		if(!isOpen()){
			lightbox.className = "lightbox display";
			lightbox_bg.className = "lightbox-bg display";
		}else{
			modal.className = "modal";
			modal.innerHTML = "";
		}
		modal.style = "";
		
		var img_url = e.target.src;
		img_url = img_url.slice(0, -5);
		img_url = img_url+"b.jpg"

		var image = document.createElement("IMG");
		image.src = img_url;
		image.title = e.target.title;
		var image_title = document.createElement("H3");
		image_title.innerHTML = image.title;
		image_title.className = "right";

		image.onload = function() {
			modal.appendChild(image);
			modal.appendChild(image_title);
			if(this.width < 1000){
				modal.style.width = this.width+"px";
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
	}

	var isOpen = function(){
		if(modal.offsetHeight === 0){
			return false;
		}else{
			return true;
		}
	}

	return {
		open: openLightbox,
		close: closeLightbox,
		isOpen: isOpen
	};
})();