	
	$(function() {


	/* teste la saisie de l'input avec une expression régulière 
	   et affiche le nombre de marqueurs correspondant à la saisie si tout est ok */

	var number = $('#number');

		number.keyup(function() {

		var input = $(this).val(); 
		var regex = new RegExp("[0-9]");
		if (regex.test(input) && input <= 1231) {

			url = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=stations-velib-disponibilites-en-temps-reel&rows=' + input + '&facet=banking&facet=bonus&facet=status&facet=contract_name';
			initMap();		

		} else {
			$(this).val(input.substr(0, input.length-1));

		}

	});

		/*Envoi les données du formulaire de réservation au fichier php 
		puis traite la réponse */

		 $("form").submit(function(e) {

          e.preventDefault();

          
          var $target = $('html,body'); 
          var $modalWindow = $('#modalWindow');
          var $footer = $('#footer');

          var $form = $(this);
          var $station = $('#name').html();
          var $nom = $('#nom').val();
          var $email = $('#email').val();
          var $time = $('#duration').val();
          var $duration = $time.substr(0, 2) + ' heures et ' + $time.substr(3,5) + ' minutes';
          var $nameStation = $('#nameStation');
          var $rentaltime = $('#rentaltime');
         	  $nameStation.val($station);
            $rentaltime.val($duration);
            sessionStorage.setItem("nom", $nom);
            sessionStorage.setItem("email", $email);
            sessionStorage.setItem("duree", $duration);
            sessionStorage.setItem("station", $station);
            

          $.post($form.attr("action"), $form.serialize())

          .done(function(data) {
            $footer.html(data);
            $modalWindow.modal("hide");
            $target.animate({scrollTop: $footer.height()}, 1000); 
          })

          .fail(function() {
            alert('ça marche pas..');
            $footer.html($nom + ' - ' + $email + ' a réservé 1 vélo pour ' + $duration + ' à la station ' + $station);
            $modalWindow.modal("hide"); 
            $target.animate({scrollTop: $footer.height()}, 1000);
          });
        });
      
});

   // Affiche les variables de sessions 
        function session () {

      var $target = $('html,body'); 
      var $footer = $('#footer');
      var nom = sessionStorage.getItem('nom');
      var email = sessionStorage.getItem('email');
      var duree = sessionStorage.getItem('duree');
      var station = sessionStorage.getItem('station');
        
        $footer.html(nom + ' - ' + email + ' a reservé 1 vélo pour ' + duree + ' à la station ' + station);
        $target.animate({scrollTop: $footer.height()}, 1000);

        if ($footer.html() == 'null - null a reservé 1 vélo pour null à la station null')
          $footer.html('');
      };