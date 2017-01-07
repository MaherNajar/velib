// définit l'url de la requète avec 20 marqueurs comme paramètre par défaut (rows=20)
var url = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=stations-velib-disponibilites-en-temps-reel&rows=20&facet=banking&facet=bonus&facet=status&facet=contract_name';

// Stocke dans une variable le champ input
var number = $('#number');



function initMap() {

// Donne le focus à l'input afin de se placer sur la partie carte dès le chargement de la page

	number.focus();

// La carte est initialisée avec des paramètres par défaut

			  var map = new google.maps.Map(document.getElementById('map'), {
			    zoom: 12,
			    center: {lat: 48.8724200631, lng: 2.34839523628}
			  });
 

 // Une fois la carte initialisée, la requète est lancée

       ajaxGet(url, function (reponse) {

 // La variable data stoque la réponse traduite des données brutes

        var data = JSON.parse(reponse); 

 /* La boucle va placer des marqueurs sur la carte en fonction des coordonnées de latitude et de longitude
      qu'elle récupére des données */

          for(i=0; i < data.records.length;i++) {


            var donnee = data.records[i].fields;

            var latitude = donnee.position[0];

            var longitude = donnee.position[1];



			var marker = new google.maps.Marker

			({
			    position: {lat: latitude, lng: longitude}, 
			    map: map,
			    title: donnee.name // Chaque marqueur crée avec la boucle porte un nom unique qui est celui de la station 
			 });

	// La méthode d'écoute de l'objet marqueur est appelé lorsqu'il est séléctionné

			 marker.addListener('click', function () {


	// On stocke dans des variables les éléments séléctionné dans la page HTML

			 		var name = $('#name');
			 		var address = $('#address');
			 		var stands = $('#stands');
			 		var bikes = $('#bikes');
			 		var latitude = $('#latitude');
			 		var longitude = $('#longitude');
			 		var state = $('#status')
			 		var update = $('#update');

	// Toutes les variables sont vidées de leur contenu

			 		name.html('');
			 		address.html('');
			 		stands.html('');
			 		bikes.html('');
			 		latitude.html('');
			 		longitude.html('');
			 		state.html('');
			 		update.html('');

	
	// Affiche le nom du marqueur séléctionné sans la partie superflue
					
					
					name.append(this.getTitle().substr(8, this.getTitle().length-1));


	/* 	La boucle va parcourir les données de l'API vélib jusqu'à trouver un i 
   		qui concorde le nom dans les données avec celui du marqueur séléctionné  
   		Une fois le i trouvé, tout les détails de la sation peuvent êtres affiché :) */

 		
			 		for (i=0; this.getTitle() != data.records[i].fields.name; i++)	


	// Affiche l'état de la station en vert si elle est ouverte et en rouge si elle est fermée		 		
			 		
			 		var status = data.records[i].fields.status;
			 		
			 		switch (status) 
			 		{
			 			case 'OPEN':
			 			state.html('Ouverte').css('color', 'green');
			 			break;
			 			case 'CLOSED':
			 			state.html('Fermée').css('color', 'red');
			 			break;
			 		}

	// Affiche l'heure et la date à laquelle les données ont été mis à jour sans la partie superflue

			 		var time = data.records[i].fields.last_update.substr(11,8);
			 		var date = data.records[i].fields.last_update.substr(0,10);
			 		
			 		update.append(date + ' à ' + time);

	// Affiche l'addresse de la sation ect...

			 		address.append(data.records[i].fields.address);
			 		stands.append(data.records[i].fields.bike_stands);
			 		bikes.append(data.records[i].fields.available_bikes);
			 		//latitude.append(data.records[i].fields.position[0]);
			 		//longitude.append(data.records[i].fields.position[1]);


	// Redonne le focus à l'input après séléction d'un marqueur
			 		
			 		number.focus();
			 	
			  	
			});	
  		};
	 		  
	});

};










	



	




	
  
