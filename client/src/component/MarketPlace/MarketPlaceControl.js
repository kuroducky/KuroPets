import React from "react";
import MarkplaceView from "./MarketPlaceView";

// props: {keywords: []}
class MarkPlaceControl extends React.Component {
  state = {
    posts: [],
  };
  async componentDidUpdate(previousProps, previousState) {
    const { keywords } = this.props;
    let queryString;
    if (previousProps.keywords !== this.props.keywords) {
      if (keywords.length > 0) {
        queryString = `http://172.21.148.170/api/post/?title=${keywords[0]}`;
      } else {
        queryString = `http://172.21.148.170/api/post`;
      }
      const response = await fetch(queryString);
      const json = await response.json();
      this.setState({ posts: json });
    }
  }

  async componentDidMount() {
    const { keywords } = this.props;
    let queryString = "";
    if (keywords.length > 0) {
      queryString = `/?title=${keywords[0]}`;
    }
    const response = await fetch(
      `http://172.21.148.170/api/post${queryString}`
    );
    const json = await response.json();
    this.setState({ posts: json });
  }
  render() {
    const { posts } = this.state;
    return (
      <div>
        <MarkplaceView posts={posts} />
      </div>
    );
  }
}

export default MarkPlaceControl;
