import React from "react";
import { Button, Row, Col, Typography } from "antd";
import FittedImage from "react-fitted-image";
import { InfoCircleOutlined } from "@ant-design/icons";
const { Title } = Typography;
// const posts = [
//   {
//     postID: 1234,
//     title: "Help me feed my turtles",
//     images: [
//       "https://images.unsplash.com/photo-1548366086-7f1b76106622?ixlib=rb-1.2.1&auto=format&fit=crop&w=924&q=80"
//     ],
//     dateTime: "2020-03-04T13:30",
//     description:
//       "lorum lorum haelp uh soim oay pui orum lorum haelp uh soim oay pu orum lorum haelp uh soim oay pu orum lorum haelp uh soim oay pu orum lorum haelp uh soim oay pu",
//     status: "Pending Service",
//     user: {
//       accountID: "12345",
//       name: "Johnny Koh"
//     }
//   },
//   {
//     postID: 1235,
//     title: "Help me take care 5 days",
//     images: [
//       "https://images.unsplash.com/photo-1501820488136-72669149e0d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
//     ],
//     dateTime: "2020-03-04T13:40",
//     description:
//       "lorum lorum haelp io jiin uoorum lorum haelp uh soim oay pu orum lorum haelp uh soim oay puj kuh soijm oay pui",
//     status: "Pending Service",
//     user: {
//       accountID: "12346",
//       name: "Scrappy Tay"
//     }
//   },
//   {
//     postID: 1236,
//     title: "Can you help me buy dog food",
//     images: [
//       "https://images.unsplash.com/photo-1551928692-6954104dee5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80"
//     ],
//     dateTime: "2020-03-04T16:30",
//     status: "Pending Service",
//     description:
//       "lorum lorum haelp io jiin uoj kuh soijm orum lorum haelp uh soim oay pu orum lorum haelp uh soim oay pu orum lorum haelp uh soim oay puoay pui iio uun uhdifinu",
//     user: {
//       accountID: "12347",
//       name: "Sleepy Tay"
//     }
//   },
//   {
//     postID: 1237,
//     title: "Looking for dogs to mate with my cat",
//     status: "Pending Service",
//     images: [
//       "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80"
//     ],
//     dateTime: "2020-03-05T10:30",
//     description:
//       "lorum lorum haelu op orum lorum haelp uh soim oay pu orum lorum haelp uh soim oay puorum lorum haelp uh soim oay puo unpi io jiin uoj kuh soijm oay pui",
//     user: {
//       accountID: "12348",
//       name: "Skippy Tay"
//     }
//   },
//   {
//     postID: 1238,
//     title: "My goldfish is drowning help me!",
//     status: "Pending Service",
//     images: [
//       "https://images.unsplash.com/photo-1504826260979-242151ee45b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
//     ],
//     dateTime: "2020-03-06T13:30",
//     description:
//       "lorum lorum haelp io ji orum lorum haelp uh soim oay pu orum lorum haelp uh soim oay puin uoj kuh siiu 80 ni oijm oay pui",
//     user: {
//       accountID: "12345",
//       name: "Johnny Koh"
//     }
//   }
// ];

class PostTab extends React.Component {
  state = {
    posts: []
  };

  viewPost = id => {
    this.props.history.push(`/post/${id}`);
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await fetch(`http://172.21.148.170/api/user/${id}/post`); // http://172.21.148.170/api/user/31/offer
    const json = await response.json();
    console.log(json);
    this.setState({ posts: json });
  }
  render() {
    const truncateString = (str, num) => {
      // If the length of str is less than or equal to num
      // just return str--don't truncate it.
      if (str.length <= num) {
        return str;
      }
      // Return str truncated with '...' concatenated to the end of str.
      return str.slice(0, num) + "...";
    };

    const { posts } = this.state;
    return (
      <div
        style={{
          maxHeight: "600px",
          overflow: "auto",
          padding: "8px 24px"
        }}
      >
        {posts.map((post, key) => {
          return (
            <div
              key={key}
              style={{
                border: "1px solid #e8e8e8",
                borderRadius: "8px",
                padding: "20px 20px 20px 20px",
                marginBottom: "15px",
                minHeight: "150px",
                boxShadow:
                  "0 3px 10px 0 rgba(44,44,45,.07), inset 0 0 0 1px rgba(44,44,45,.07)"
              }}
            >
              <Row gutter={16}>
                <Col span={6}>
                  <FittedImage
                    fit="cover"
                    style={{
                      height: "130px",
                      borderRadius: "8px"
                    }}
                    src={
                      post.images[0] ? post.images[0] : "/placeholder-tb.png"
                    }
                  />
                </Col>
                <Col span={12}>
                  <Title level={3}>{post.title}</Title>
                  {truncateString(post.description, 130)}
                </Col>
                <Col span={6}>
                  <Button
                    block
                    size="large"
                    style={{ marginBottom: "10px" }}
                    // size="large"
                    type="primary"
                    onClick={() => {
                      this.viewPost(post.postID);
                    }}
                  >
                    <strong>View Full Post</strong>
                  </Button>
                  <InfoCircleOutlined /> Status: <strong>{post.status} </strong>
                </Col>
              </Row>
            </div>
          );
        })}
      </div>
    );
  }
}

export default PostTab;
