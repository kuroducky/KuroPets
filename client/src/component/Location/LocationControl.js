import React from "react";
import { Tabs, Row, Col } from "antd";
const { TabPane } = Tabs;

class LocationControl extends React.Component {
  state = {
    vets: []
  };
  async componentDidMount() {
    const vetData = await fetch(
      "https://data.gov.sg/api/action/datastore_search?resource_id=b2871270-4eef-44a3-be98-908e2a73b19f"
    );

    vetData.json().then(r => {
      console.log(r);
      this.setState({
        vets: r.result.records
      });
    });

    const weatherData = await fetch(
      "https://www.nea.gov.sg/api/Weather24hrs/GetData/1573372500"
    );

    weatherData.json().then(r => {
      console.log(r);
    });
  }
  render() {
    console.log(this.state.vets);

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
                  <iframe
                    width="90%"
                    height="90%"
                    src="https://data.gov.sg/dataset/list-of-licensed-vet-centres/resource/b2871270-4eef-44a3-be98-908e2a73b19f/view/286eec34-5059-43dc-b927-3573341858dc"
                    frameBorder="0"
                  >
                    {" "}
                  </iframe>
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
  }
}

export default LocationControl;
