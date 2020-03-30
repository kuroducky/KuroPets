import React from "react";
import { Tabs } from "antd";
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
  }
  render() {
    console.log(this.state.vets);

    return (
      <div style={{ height: "600px" }}>
        Map below displays vets and parks locations
        <Tabs
          style={{ margin: "0 0 20px 0", height: "700px" }}
          onChange={this.callback}
          type="card"
        >
          <TabPane tab="Vets" key="1">
            <div style={{ height: "700px" }}>
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
            <div style={{ height: "700px" }}>
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
    );
  }
}

export default LocationControl;
