import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getStations } from '../services/velib-service';
import TableInfo from './tableInfo';
import Slider from './slider';
import VelibLogo from '../icons/VelibLogo';
import LoadingSpinner from '../icons/LoadingSpinner';

export default class Velib extends Component {
  state = {
    maxMarkers: null,
    rangeMarkers: 25,
    markers: [],
    filtredMarkers: [],
    activeMarker: null,
    selectedPlace: { position: { lat: 48.8724200631, lng: 2.34839523628 } },
  };

  countStyle = {
    fontSize: '30px',
  };

  async componentDidMount() {
    await this.getData();
    this.getFiltredMarkers();
  }

  getData = async () => {
    const { markers, maxMarkers } = await getStations();
    this.setState({ markers, maxMarkers });
  };

  onChangeMarkersRange = async (rangeMarkers) => {
    this.setState({ rangeMarkers });
    this.getFiltredMarkers();
  };

  getFiltredMarkers = () => {
    const markers = [...this.state.markers];
    const filtredMarkers = markers.slice(0, this.state.rangeMarkers);
    this.setState({ filtredMarkers });
  };

  onMarkerClick = (marker) => {
    this.setState({
      activeMarker: marker,
    });
  };

  MapClicked = () => {
    this.setState({
      activeMarker: null,
    });
  };

  render() {
    const { filtredMarkers, maxMarkers, activeMarker, selectedPlace, rangeMarkers } =
      this.state;

    return (
      <div className="row">
        <div className="col-6">
          <MapContainer
            className="map"
            center={[selectedPlace.position.lat, selectedPlace.position.lng]}
            zoom={13}
          >
            {filtredMarkers.map((marker) => (
              <Marker
                key={marker.codeStation}
                position={marker.position}
                opacity={0.7}
                eventHandlers={{
                  click: () => {
                    this.onMarkerClick(marker);
                  },
                }}
              >
                <Popup>
                  <div>
                    <h6>{marker.nomStation}</h6>
                  </div>
                </Popup>
              </Marker>
            ))}

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>
        <div className="col">
          <div id="infos" className="text-center">
            <div className="row">
              <div className="col-md-12 mt-4">
                <h4>
                  {filtredMarkers.length === 0 ? (
                    <LoadingSpinner style={{ marginRight: '5px' }} />
                  ) : null}
                  <span style={this.countStyle}>{rangeMarkers}</span> marqueurs de
                  stations <VelibLogo width="70px" height="70px" /> sur{' '}
                  <span style={this.countStyle}>{maxMarkers}</span> vont s'afficher sur la
                  carte, faites deplacer le vélo !
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
                  <h4 style={{ marginTop: '200px' }}>
                    Cliquez sur un marqueur pour afficher les disponibilités en temps réel
                    !
                  </h4>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
