import React from "react";
import MarkplaceView from "./MarketPlaceView";

const dummyPosts = [
  {
    postID: 1234,
    title: "Help me feed my turtles",
    images: [
      "https://images.unsplash.com/photo-1548366086-7f1b76106622?ixlib=rb-1.2.1&auto=format&fit=crop&w=924&q=80"
    ],
    dateTime: "2020-03-04T13:30",
    description: "lorum lorum haelp uh soim oay pui",
    user: {
      accountID: "12345",
      name: "Johnny Koh"
    }
  },
  //   //postID: 1
  // status: "Pending Service "
  // title: "A cat's penis"
  // description: " My cat penis quite big and sharp!"
  // startDate: "2018-01-22T16:00:00.000Z"
  // endDate: "2018-02-22T16:00:00.000Z"
  // timestamp: "2018-01-19T16:00:00.000Z"
  // typeOfPet: "Catty Kitten"
  // service: "Groom her cock!"
  // location: "Doggy Style"
  // accountID: 1
  // images: Array(2)
  // 0: null
  // 1: null
  {
    postID: 1235,
    title: "Help me take care of my dog for 5 days",
    images: [
      "https://images.unsplash.com/photo-1501820488136-72669149e0d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
    ],
    dateTime: "2020-03-04T13:40",
    description: "lorum lorum haelp io jiin uoj kuh soijm oay pui",
    user: {
      accountID: "12346",
      name: "Scrappy Tay"
    }
  },
  {
    postID: 1236,
    title: "Can you help me buy dog food",
    images: [
      "https://images.unsplash.com/photo-1551928692-6954104dee5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80"
    ],
    dateTime: "2020-03-04T16:30",
    description:
      "lorum lorum haelp io jiin uoj kuh soijm oay pui iio uun uhdifinu",
    user: {
      accountID: "12347",
      name: "Sleepy Tay"
    }
  },
  {
    postID: 1237,
    title: "Looking for dogs to mate with my cat",
    images: [
      "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80"
    ],
    dateTime: "2020-03-05T10:30",
    description: "lorum lorum haelu opo unpi io jiin uoj kuh soijm oay pui",
    user: {
      accountID: "12348",
      name: "Skippy Tay"
    }
  },
  {
    postID: 1238,
    title: "My goldfish is drowning help me!",
    images: [
      "https://images.unsplash.com/photo-1504826260979-242151ee45b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
    ],
    dateTime: "2020-03-06T13:30",
    description: "lorum lorum haelp io jiin uoj kuh siiu 80 ni oijm oay pui",
    user: {
      accountID: "12345",
      name: "Johnny Koh"
    }
  }
];

class MarkPlaceControl extends React.Component {
  state = {
    posts: dummyPosts,
    keywords: []
  };
  async componentDidMount() {
    const response = await fetch(`http://172.21.148.170/api/post`);
    const json = await response.json();
    console.log(json);
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
