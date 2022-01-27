import axios from 'axios';

const maxStations = 1362;

function getUrl() {
  return (
    'https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&rows=' +
    maxStations
  );
}

async function getStations() {
  const { data } = await axios.get(getUrl());

  const maxMarkers = data.nhits;

  let markers = [];

  for (let i = 0; i < data.records.length; i++) {
    const e = data.records[i];

    if (e.hasOwnProperty('geometry')) {
      var lat = e.geometry.coordinates[1];
      var lng = e.geometry.coordinates[0];
      var recordTime = new Date(e.record_timestamp).toLocaleDateString();

      var {
        stationcode: codeStation,
        name: nomStation,
        is_renting: etatStation,
        capacity: nbBornesTotal,
        numdocksavailable: nbBornesDisponibles,
        mechanical: nbVelosMecaniques,
        ebike: nbVelosElectriques,
        is_installed: achatCB,
      } = e.fields;

      markers.push({
        codeStation,
        nomStation,
        position: { lat, lng },
        etatStation,
        nbBornesTotal,
        nbBornesDisponibles,
        nbVelosMecaniques,
        nbVelosElectriques,
        recordTime,
        achatCB,
      });
    }
  }

  return { markers, maxMarkers };
}

export { getStations };
