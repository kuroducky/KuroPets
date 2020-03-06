import React from "react";
import PostView from "./PostView";

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
    accountID: "12345",
    name: "Johnny Koh"
  }
};
class PostControl extends React.Component {
  state = {
    id: this.props.match.params.id,
    postDetails: postDetails
  };

  render() {
    const { postDetails } = this.state;
    return <PostView postDetails={postDetails} />;
  }
}

export default PostControl;
