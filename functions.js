	
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
          var $nameStation = $('#nameStation');
         	  $nameStation.val($station);

          $.post($form.attr("action"), $form.serialize())

          .done(function(data) {
            $footer.html(data);
            $modalWindow.modal("hide");
            $target.animate({scrollTop: $footer.height()}, 1000); 
          })

          .fail(function() {
            alert('ça marche pas..');
            $footer.html($nom + ' - ' + $email + ' a réservé 1 vélo à la station ' + $station);
            $modalWindow.modal("hide"); 
            $target.animate({scrollTop: $footer.height()}, 1000);
          });
        });

		
});