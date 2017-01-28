// URL par défault de la requète avec 20 marqueurs (rows=20)
var url = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=stations-velib-disponibilites-en-temps-reel&rows=20&facet=banking&facet=bonus&facet=status&facet=contract_name';

var book = $('#book');

function initMap() {


	// initialise la carte
	  var map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 12,
	    center: {lat: 48.8724200631, lng: 2.34839523628}
	  });
 
 	// lance la requète
        ajaxGet(url, function (reponse) {

 	// parse les données brutes
	  var data = JSON.parse(reponse); 
	       

          for(i=0; i < data.records.length;i++) {

            var donnee = data.records[i].fields;
            var latitude = donnee.position[0];
            var longitude = donnee.position[1];
		  
	   // place des marqueurs sur la carte 
		var marker = new google.maps.Marker
		({
		    position: {lat: latitude, lng: longitude}, 
		    map: map,
		    title: donnee.name  
		 });

	   // appelle la méthode d'écoute de l'objet marker
		marker.addListener('click', function () {

			// Affiche les libellés
					var h2 = $('h2');
					var details = $('.details');
						h2.show();
						details.show();

			// Sélectionne les éléments html
			 		var name = $('#name');
			 		var address = $('#address');
			 		var stands = $('#stands');
			 		var bikes = $('#bikes');
			 		var latitude = $('#latitude');
			 		var longitude = $('#longitude');
			 		var state = $('#status')
			 		var update = $('#update');

			// vide les éléments de leurs contenu
			 		name.html('');
			 		address.html('');
			 		stands.html('');
			 		bikes.html('');
			 		latitude.html('');
			 		longitude.html('');
			 		state.html('');
			 		update.html('');

			// Affiche le 'title' du marker avec une modification et un effet
					name.html(this.getTitle().substr(8, this.getTitle().length-1)).hide().fadeIn('slow');

			// parcours les données jusqu'à trouver une correspondance pour utiliser 'i' par la suite
			 		for (i=0; this.getTitle() != data.records[i].fields.name; i++)	

			// Affiche l'état de la station en vert si elle est ouverte et en rouge si elle est fermée		 		
			 		var status = data.records[i].fields.status;
			 		
			 		switch (status) 
			 		{
			 			case 'OPEN':
			 			state.html('Ouverte').css('color', 'green');
			 			book.show();
			 			break;
			 			case 'CLOSED':
			 			state.html('Fermée').css('color', 'red');
			 			book.hide();
			 			break;
			 		}
			
			// Affiche l'heure et la date à laquelle les données ont été mis à jour avec une modification et un effet
			 		var time = data.records[i].fields.last_update.substr(11,8);
			 		var date = data.records[i].fields.last_update.substr(0,10);
			 		update.html(date + ' à ' + time).hide().fadeIn('slow');

			// Affiche l'addresse de la sation ect...
			 		address.html(data.records[i].fields.address).hide().fadeIn('slow');
			 		stands.html(data.records[i].fields.bike_stands).hide().fadeIn('slow');
			 		bikes.html(data.records[i].fields.available_bikes).hide().fadeIn('slow');
			 		//latitude.html(data.records[i].fields.position[0]);
			 		//longitude.html(data.records[i].fields.position[1]);
			
			  	
			});	
  		};
	 		  
	});

};
