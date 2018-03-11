function initMap() {

	session();

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
		center: { lat: 48.8724200631, lng: 2.34839523628 }
	});

	var url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&rows=1000";

	$.get(url, function (data) {
		console.log(data);

		data.records.forEach(e => {

			if (e.hasOwnProperty('geometry')) {
				var lattitude = e.geometry.coordinates[1];
				var longitude = e.geometry.coordinates[0];
				var stationName = e.fields.name;
				var numbikesavailable = e.fields.numbikesavailable;
				var capacity = e.fields.capacity;
				var recordTime = new Date(e.record_timestamp);	

				var marker = new google.maps.Marker({
					position: { lat: lattitude, lng: longitude },
					map: map,
					title: stationName
				});

				marker.addListener('click', function () {
					$('.details').show();
					$('#book').removeAttr('disabled');
					$('#name').html(stationName);
					$('#numbikesavailable').html(numbikesavailable);
					$('#capacity').html(capacity);
					$('#recordtime').html(recordTime.toLocaleDateString());
				});
			}
		});
	});
}

/*Envoi les données du formulaire de réservation au fichier php 
puis traite la réponse */

$("form").submit(function (e) {

	e.preventDefault();
  
  
	var $target = $('html,body');
	var $modalWindow = $('#modalWindow');
	var $footer = $('#footer');
  
	var $form = $(this);
	var $station = $('#name').html();
	var $nom = $('#nom').val();
	var $email = $('#email').val();
	var $time = $('#duration').val();
	var $duration = $time.substr(0, 2) + ' heures et ' + $time.substr(3, 5) + ' minutes';
	var $nameStation = $('#nameStation');
	var $rentaltime = $('#rentaltime');
	$nameStation.val($station);
	$rentaltime.val($duration);
	sessionStorage.setItem("nom", $nom);
	sessionStorage.setItem("email", $email);
	sessionStorage.setItem("duree", $duration);
	sessionStorage.setItem("station", $station);
  
  
	$.post($form.attr("action"), $form.serialize())
  
	  .done(function (data) {
		$footer.html(data);
		$modalWindow.modal("hide");
		$target.animate({ scrollTop: $footer.height() }, 1000);
	  })
  
	  .fail(function () {
		alert('ça marche pas..');
		$footer.html($nom + ' - ' + $email + ' a réservé 1 vélo pour ' + $duration + ' à la station ' + $station);
		$modalWindow.modal("hide");
		$target.animate({ scrollTop: $footer.height() }, 1000);
	  });
  });
  
  // Affiche les variables de sessions 
  function session() {
  
	var $target = $('html,body');
	var $footer = $('#footer');
	var nom = sessionStorage.getItem('nom');
	var email = sessionStorage.getItem('email');
	var duree = sessionStorage.getItem('duree');
	var station = sessionStorage.getItem('station');
  
	$footer.html(nom + ' - ' + email + ' a reservé 1 vélo pour ' + duree + ' à la station ' + station);
	$target.animate({ scrollTop: $footer.height() }, 1000);
  
	if ($footer.html() == 'null - null a reservé 1 vélo pour null à la station null')
	  $footer.html('');
  };