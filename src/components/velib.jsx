import React, { Component } from "react";
import { Map, InfoWindow, Marker } from "google-maps-react";
import { getStations } from "../services/velib-service";
import TableInfo from "./tableInfo";
import Slider from "./slider";
import VelibLogo from "../icons/VelibLogo";
import LoadingSpinner from "../icons/LoadingSpinner";

export default class Velib extends Component {
  state = {
    maxMarkers: null,
    rangeMarkers: 480,
    markers: [],
    filtredMarkers: [],
    showingInfoWindow: false,
    activeMarker: null,
    selectedPlace: { position: { lat: 48.8724200631, lng: 2.34839523628 } }
  };

  countStyle = {
    fontSize: "30px"
  };

  async componentDidMount() {
    await this.getData();
    await this.getFiltredMarkers();
  }

  getData = async () => {
    const { data } = await getStations();
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
  };

  onChangeMarkersRange = async rangeMarkers => {
    await this.setState({ rangeMarkers });
    await this.getFiltredMarkers();
  };

  getFiltredMarkers = () => {
    const markers = [...this.state.markers];
    const filtredMarkers = markers.slice(0, this.state.rangeMarkers);
    this.setState({ filtredMarkers });
  };

  onMarkerClick = (props, marker, e) => {
    const markerSource = this.state.markers.find(
      m => m.codeStation === marker.uid
    );
    Object.assign(marker, markerSource);
    this.setState({
      activeMarker: marker,
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
      filtredMarkers,
      maxMarkers,
      activeMarker,
      selectedPlace,
      showingInfoWindow,
      rangeMarkers
    } = this.state;

    const { google } = this.props;

    return (
      <div className="row">
        <div className="map col-md-4 col-sm-6 col-xs-12">
          <Map
            onClick={this.onMapClicked}
            google={google}
            zoom={12}
            initialCenter={{
              lat: selectedPlace.position.lat,
              lng: selectedPlace.position.lng
            }}
          >
            {filtredMarkers.map(marker => (
              <Marker
                uid={marker.codeStation}
                key={marker.codeStation}
                name={marker.nomStation}
                title={marker.nomStation}
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
            <div className="col-md-12 mt-4">
              <h4>
                {filtredMarkers.length === 0 ? (
                  <LoadingSpinner style={{ marginRight: "5px" }} />
                ) : null}
                <span style={this.countStyle}>{rangeMarkers}</span> marqueurs de
                stations <VelibLogo width="70px" height="70px" /> sur{" "}
                <span style={this.countStyle}>{maxMarkers}</span> vont
                s'afficher sur la carte, faites glisser le vélo !
              </h4>
              <Slider
                onChange={this.onChangeMarkersRange}
                maxMarkers={maxMarkers}
                value={rangeMarkers}
              />
            </div>
            <div className="col tableInfos">
              {activeMarker ? (
                <TableInfo activeMarker={activeMarker} />
              ) : (
                <h4 style={{ marginTop: "200px" }}>
                  Cliquez sur un marqueur pour afficher les disponibilités en
                  temps réel !
                </h4>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
