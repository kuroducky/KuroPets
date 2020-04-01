import React from "react";
import { Tabs, Row, Col } from "antd";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const { TabPane } = Tabs;

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: 1.3521, lng: 103.8198 }}>
      {" "}
      {/* {props.isMarkerShown && (
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
      )} */}
      {props.vets.map(v => {
        console.log(v.lat);
        return (
          <Marker
            key={v._id}
            position={{
              lat: Number(v.lat),
              lng: Number(v.long)
            }}
          />
        );
      })}
    </GoogleMap>
  ))
);

class LocationControl extends React.Component {
  state = {
    vets: []
  };
  async componentDidMount() {
    const vetData = await fetch(
      "https://data.gov.sg/api/action/datastore_search?resource_id=b2871270-4eef-44a3-be98-908e2a73b19f"
    );
    vetData.json().then(async r => {
      let vets = r.result.records;
      let arrayPostal = [];
      let vetsData = [];
      vets.forEach(v => {
        arrayPostal.push(v.postal_code);
      });
      console.log(arrayPostal);
      let i = 0;
      arrayPostal.forEach(async code => {
        const oneMapData = await fetch(
          `https://developers.onemap.sg/commonapi/search?searchVal=${code}&returnGeom=Y&getAddrDetails=Y`
        );
        const returnData = await oneMapData.json();
        if (returnData.results[0]) {
          const lat = returnData.results[0].LATITUDE;
          const long = returnData.results[0].LONGITUDE;
          vets[i].lat = lat;
          vets[i].long = long;
        }

        i++;
      });

      this.setState({
        vets: r.result.records
      });
    });

    // const weatherData = await fetch(
    //   "https://www.nea.gov.sg/api/Weather24hrs/GetData/1573372500"
    // );

    // weatherData.json().then(r => {
    //   console.log(r);
    // });
  }
  render() {
    console.log(this.state.vets[0]);
    if (this.state.vets[0]) {
      return (
        <Row style={{ marginTop: "20px" }} gutter={16}>
          <Col span={8}>I am a guoxiong</Col>
          <Col span={16}>
            <div style={{ height: "600px" }}>
              <Tabs
                style={{ margin: "0 0 20px 0", height: "700px" }}
                onChange={this.callback}
                type="card"
              >
                <TabPane tab="Vets" key="1">
                  <div style={{ height: "500px" }}>
                    {/* <iframe
                    width="90%"
                    height="90%"
                    src="https://data.gov.sg/dataset/list-of-licensed-vet-centres/resource/b2871270-4eef-44a3-be98-908e2a73b19f/view/286eec34-5059-43dc-b927-3573341858dc"
                    frameBorder="0"
                  >
                    {" "}
                  </iframe> */}

                    <MyMapComponent
                      isMarkerShown
                      vets={this.state.vets}
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDH4TLVV3LYbKJLx6xCWwzaVkTNDA52lNY"
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `500px` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                    />
                  </div>
                </TabPane>
                <TabPane tab="Parks" key="2">
                  <div style={{ height: "500px" }}>
                    <iframe
                      width="90%"
                      height="90%"
                      src="https://data.gov.sg/dataset/parks/resource/507ec5a8-ecc2-4fb7-bbc9-0374c523e10e/view/e8273b0b-ec69-47ac-9145-be32a5b2f701"
                      frameBorder="0"
                    >
                      {" "}
                    </iframe>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
      );
    } else {
      return <div />;
    }
  }
}

export default LocationControl;
