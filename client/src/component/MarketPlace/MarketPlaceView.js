import React from "react";
import moment from "moment";
import FittedImage from "react-fitted-image";
import { Card, Col, Avatar, Row, Typography, Empty } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
const { Text, Title } = Typography;
const { Meta } = Card;

function calculateDiff(date_time) {
  if (moment().diff(date_time, "minutes") < 1) return "just created";
  if (moment().diff(date_time, "minutes") < 60)
    return moment().diff(date_time, "minutes") == 1
      ? `${moment().diff(date_time, "minutes")} minute ago`
      : `${moment().diff(date_time, "minutes")} minutes ago`;
  else if (moment().diff(date_time, "hours") < 24)
    return moment().diff(date_time, "hours") == 1
      ? `${moment().diff(date_time, "hours")} hour ago`
      : `${moment().diff(date_time, "hours")} hours ago`;
  else
    return moment().diff(date_time, "days") == 1
      ? `${moment().diff(date_time, "days")} day ago`
      : `${moment().diff(date_time, "days")} days ago`;
}

const MarketPlaceView = ({ posts }) => {
  posts = posts.filter(post => post.status !== "Service Completed");
  // Post = {
  //   postID: 1238,
  //   title: "My goldfish is drowning help me!",
  //   img: "string",
  //   dateTime: "2020-03-06T13:30",
  //   description: "lorum lorum haelp io jiin uoj kuh siiu 80 ni oijm oay pui",
  //   user: {
  //     accountID: "12345",
  //     name: "Johnny Koh"
  //   }
  // }
  const rows = [];
  const noOfRows = Math.ceil(posts.length / 4);
  for (let i = 0; i < posts.length; i += 4) {
    if (rows.length - 1 === noOfRows) {
      rows.push(posts.slice(i, posts.length - 1));
    } else {
      rows.push(posts.slice(i, i + 4));
    }
  }
  const truncateString = (str, num) => {
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
      return str;
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + "...";
  };

  return (
    <div>
      <Title level={2}>Marketplace</Title>
      {rows.length == 0 ? (
        <Empty />
      ) : (
        rows.map((posts, i) => (
          <Row
            key={i}
            style={{
              marginTop: "20px"
            }}
            gutter={16}
          >
            {posts.map((post, i) => (
              <Col key={i} span={6}>
                <Link to={`/post/${post.postID}`}>
                  <Card hoverable bordered={false}>
                    <Title style={{ marginBottom: "5px" }} level={4} strong>
                      <Avatar
                        style={{
                          marginRight: "6px"
                        }}
                        icon={<UserOutlined />}
                      />
                      {post.user.name}{" "}
                    </Title>
                    <Text type="secondary">
                      {calculateDiff(post.timestamp)}
                    </Text>{" "}
                    <br />
                    <FittedImage
                      fit="cover"
                      style={{
                        height: "50vh",
                        width: "18vw",
                        margin: "10px auto 20px auto",
                        borderRadius: "8px"
                      }}
                      src={
                        post.images[0] ? post.images[0] : "/placeholder-lg.png"
                      }
                    />
                    <Meta
                      title={post.title}
                      description={truncateString(post.description, 50)}
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        ))
      )}
      {/*  */}
    </div>
  );
};

export default MarketPlaceView;
