<?php

$nom = $_POST['nom'];
$email = $_POST['email'];
$station = $_POST['station'];
$date = date("d-m-Y");
$heure = date("H:i");

$filename = 'booking.txt';
$line = $nom . " - " . $email . " a réservé 1 vélo à la station " . $station . " à " . $heure . " le " . $date . " \n";

// Assurons nous que le fichier est accessible en écriture
if (is_writable($filename)) {

    // Dans notre exemple, nous ouvrons le fichier $filename en mode d'ajout
    // Le pointeur de fichier est placé à la fin du fichier
    // c'est là que $line sera placé
    if (!$handle = fopen($filename, 'a')) {
         echo "Impossible d'ouvrir le fichier ($filename)";
         exit;
    }

    // Ecrivons quelque chose dans notre fichier.
    if (fwrite($handle, $line) === FALSE) {
        echo "Impossible d'écrire dans le fichier ($filename)";
        exit;
    }

    echo "L'enregistrement de la réservation de $nom à la station $station dans le fichier ($filename) a réussi";

    fclose($handle);

} else {
    echo "Le fichier $filename n'est pas accessible en écriture.";
}

?>