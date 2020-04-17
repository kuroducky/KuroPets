import React from "react";
import { Tabs, Row, Col } from "antd";

const { TabPane } = Tabs;

class LocationControl extends React.Component {
  state = {
    vets: [],
  };
  render() {
    return (
      <Row style={{ marginTop: "20px" }} gutter={16}>
        <Col offset={1} span={22}>
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
