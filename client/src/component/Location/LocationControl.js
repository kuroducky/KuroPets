import React from "react";

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
        Location Services Body, SHOW THE MAP HERE ~~
        <iframe
          width="90%"
          height="90%"
          src="https://data.gov.sg/dataset/list-of-licensed-vet-centres/resource/b2871270-4eef-44a3-be98-908e2a73b19f/view/286eec34-5059-43dc-b927-3573341858dc"
          frameBorder="0"
        >
          {" "}
        </iframe>
      </div>
    );
  }
}

export default LocationControl;
