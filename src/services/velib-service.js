import axios from "axios";

const maxStations = 1362;

function getUrl() {
  return (
    "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&rows=" +
    maxStations
  );
}

function getStations() {
  return axios.get(getUrl());
}

export { getStations };
