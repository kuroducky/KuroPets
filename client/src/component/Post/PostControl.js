import React from "react";
import PostView from "./PostView";
import moment from "moment";
const postDetails = {
  postID: 12345,
  title: "Help me feed my turtles",
  description:
    "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. ",
  location: "Seng Kang",
  images: [
    "https://images.unsplash.com/photo-1548366086-7f1b76106622?ixlib=rb-1.2.1&auto=format&fit=crop&w=924&q=80",
    "https://images.unsplash.com/photo-1551928692-6954104dee5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80"
  ],
  dateTime: "2020-03-04T13:30",
  status: "Pending Offer", // "pending offer", "pending service", "service completed"
  typeOfPet: "Tortise",
  typeOfService: "Walking", // "Walking". "Grooming", "Vet", "Others"
  startDate: "2020-03-07",
  endDate: "2020-03-09",
  user: {
    accountID: "20",
    name: "Scrappy Tay"
  }
};
class PostControl extends React.Component {
  state = {
    id: this.props.match.params.id,
    postDetails: postDetails,
    offers: []
  };
  updatePost = async values => {
    console.log("upd: ", values);
    console.log(values);
    const response = await fetch(
      `http://172.21.148.170/api/post/${this.state.postDetails.postID}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      }
    );

    const content = await response.json();
    content.user = this.state.postDetails.user;
    content.images = this.state.postDetails.images;
    console.log("newData:", content);
    console.log("old", this.state.postDetails);
    this.setState({ postDetails: content });
    // this.setState((prevState, props) => {
    //   return {postDetails: {...prevState.postDetails}};
    // })
    this.forceUpdate();
  };
  // async componentDidUpdate(prevProps, prevState) {
  //   if (prevState.postDetails != this.state.postDetails) {
  //     console.log("prevState", prevState.postDetails);
  //     console.log("current", this.state.postDetails);
  //     const response = await fetch(
  //       `http://172.21.148.170/api/post/${this.state.id}`
  //     );
  //     const json = await response.json();
  //     this.setState({ postDetails: json });
  //   }
  // }
  async componentDidMount() {
    console.log("fetching post data...");
    const response = await fetch(
      `http://172.21.148.170/api/post/${this.state.id}`
    );
    const json = await response.json();
    console.log(json);
    console.log("fetched data is here...");
    this.setState({ postDetails: json });

    const responseOffer = await fetch(
      `http://172.21.148.170/api/post/${this.state.id}/offer`
    );
    const jsonOffer = await responseOffer.json();
    this.setState({ offers: jsonOffer });
  }
  render() {
    const { postDetails } = this.state;
    return (
      <PostView
        postID={this.state.id}
        updatePost={this.updatePost}
        postDetails={postDetails}
        offers={this.state.offers}
        {...this.props}
      />
    );
  }
}

export default PostControl;
