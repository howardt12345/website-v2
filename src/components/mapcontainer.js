import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { lat, lng, googleMapsKey } from '@config';


export class MapContainer extends Component {
  render() {
    return (
        <Map 
        google={this.props.google} 
        zoom={14}
        style={{
          position: 'relative',  
          width: '100%',
          height: '100%'
        }}
        initialCenter={{
          lat: lat,
          lng: lng
        }}
      >  
        <Marker
        position={{lat: lat, lng: lng}} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (googleMapsKey)
})(MapContainer)