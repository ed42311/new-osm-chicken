import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer } from "react-mapbox-gl";

mapboxgl.accessToken = 'undefined'

class MapBox extends Component {
  componentDidMount() {
    console.log(process.env.REACT_APP_ACCESS_TOKEN)
  }
  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiY29udGV4dGN1ZSIsImEiOiJjanc5enAxNGQwNG85NDNwM2EwNnYzcmp2In0.-HQ8qYpTaBGzgMLIg_Dh2A"
    });

    const geojson = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'LineString',
            'coordinates': [
              [
                -122.4159547,
                37.7921393
              ],
              [
                -122.4155259,
                37.7921938
              ]
            ]
          }
        }
      ]
    };
    
    const linePaint: MapboxGL.LinePaint = {
      'line-color': 'red',
      'line-width': 5
    };
    return (

      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
        height: "100vh",
        width: "100vw"
        }}>
        <GeoJSONLayer
          data={geojson}
          linePaint={linePaint}
        />
    </Map>
    )
  }
}

class App extends Component {
  componentDidMount() {
    let query = `{
      unwalkedPaths {
        endLat
        endLon
        startLat
        startLon
      }
    }`
    let body = {
      operationName: null,
      query: query,
      variables: {}
    }
    fetch("https://osm-routing-api.now.sh/", 
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json',
        }
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div className="App">
        <MapBox />
      </div>
    );
  }

}

export default App;
