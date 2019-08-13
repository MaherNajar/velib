import React, { Component } from "react";
import { Map, InfoWindow, Marker } from "google-maps-react";
import axios from "axios";
import { debounce } from "lodash";
import TableInfo from "./tableInfo";
import Slider from "./slider";

export default class Velib extends Component {
  state = {
    maxMarkers: null,
    rangeMarkers: 100,
    markers: [],
    showingInfoWindow: false,
    activeMarker: null,
    selectedPlace: { position: { lat: 48.8724200631, lng: 2.34839523628 } }
  };

  componentDidMount() {
    this.getMarkers();
  }

  getUrl = rows => {
    return (
      "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&rows=" +
      rows
    );
  };

  getMarkers = debounce(async () => {
    const url = this.getUrl(this.state.rangeMarkers);
    const { data } = await axios.get(url);

    const maxMarkers = data.nhits;
    const markers = [];

    data.records.forEach(e => {
      if (e.hasOwnProperty("geometry")) {
        var lat = e.geometry.coordinates[1];
        var lng = e.geometry.coordinates[0];
        var recordTime = new Date(e.record_timestamp).toLocaleDateString();
        var {
          station_code: codeStation,
          station_name: nomStation,
          station_state: etatStation,
          nbedock: nbBornesTotal,
          nbfreeedock: nbBornesDisponibles,
          nbbike: nbVelosMecaniques,
          nbebike: nbVelosElectriques,
          creditcard: achatCB
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
          achatCB,
          recordTime
        });
      }

      this.setState({ markers, maxMarkers });
    });
  }, 1000);

  onChangeMarkersRange = rangeMarkers => {
    this.setState({ rangeMarkers });
    this.getMarkers(rangeMarkers);
  };

  onMarkerClick = (props, marker, e) => {
    const markerSource = this.state.markers.find(
      m => m.codeStation === marker.uid
    );
    Object.assign(marker, markerSource);
    this.setState({
      activeMarker: marker,
      activePosition: marker.position,
      selectedPlace: props,
      showingInfoWindow: true
    });
  };

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const {
      markers,
      maxMarkers,
      activeMarker,
      selectedPlace,
      showingInfoWindow,
      rangeMarkers
    } = this.state;

    return (
      <div className="row">
        <div className="map col-md-4">
          <Map
            onClick={this.onMapClicked}
            google={this.props.google}
            zoom={12}
            initialCenter={{
              lat: selectedPlace.position.lat,
              lng: selectedPlace.position.lng
            }}
          >
            {markers.map(marker => (
              <Marker
                uid={marker.codeStation}
                key={marker.codeStation}
                name={marker.nomStation}
                position={marker.position}
                onClick={this.onMarkerClick}
                opacity={0.3}
              />
            ))}

            <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
              <div>
                <h6>{selectedPlace.name}</h6>
              </div>
            </InfoWindow>
          </Map>
        </div>
        <div id="infos" className="col text-center">
          <div className="row">
            <div className="col-md-12">
              <h3>Vélib' - Disponibilité temps réel</h3>
            </div>
            <div className="col-md-12 mt-4">
              <p className="text-nowrap mb-4">
                <span
                  style={{
                    fontSize: "20px",
                    marginTop: "-30px"
                  }}
                >
                  {rangeMarkers}
                </span>{" "}
                marqueurs de stations <i>efe</i> vont s'afficher sur la carte,
                cliquez dessus.
              </p>
              <Slider
                onChange={this.onChangeMarkersRange}
                maxMarkers={maxMarkers}
                value={rangeMarkers}
                color="red"
              />
            </div>
            <div className="col tableInfos">
              {activeMarker ? <TableInfo activeMarker={activeMarker} /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
