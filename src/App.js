import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

mapboxgl.accessToken = 'undefined'

class MapBox extends Component {
  componentDidMount() {
    console.log(process.env.REACT_APP_ACCESS_TOKEN)
  }
  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiY29udGV4dGN1ZSIsImEiOiJjanc5enAxNGQwNG85NDNwM2EwNnYzcmp2In0.-HQ8qYpTaBGzgMLIg_Dh2A"
    });
    return (

      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
        height: "100vh",
        width: "100vw"
        }}>
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
        </Layer>
    </Map>
    )
  }
}

class App extends Component {
  componentDidMount() {
    let query = `{
      PointOfInterest(first:10, offset: 4) {
        name
        poi_id
        shortestPathRouteToPOI(poi_id:"Mad Dog in the Fog37.7721448-122.4310153") {
          lat
          lon
        }
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
