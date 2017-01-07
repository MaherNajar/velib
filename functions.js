	
	/* définit une fonction qui teste la saisie de l'input avec une epression régulière 
		et affiche le nombre de marqueurs correspondant à la saisie si tout est ok */

	$('#number').keyup(function() {
		var input = $(this).val(); 
		var regex = new RegExp("[0-9]");
		if (regex.test(input) && input <= 1231) {

			url = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=stations-velib-disponibilites-en-temps-reel&rows=' + input + '&facet=banking&facet=bonus&facet=status&facet=contract_name';
			initMap();
		} else {
			$(this).val(input.substr(0, input.length-1));

		}

	});
