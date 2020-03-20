import React from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Carousel, Typography, Avatar, Tooltip } from "antd";
import FittedImage from "react-fitted-image";
import {
  UserOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
  QqOutlined,
  CalendarOutlined,
  DeleteTwoTone,
  CheckCircleTwoTone,
  EditTwoTone,
  SmileOutlined
} from "@ant-design/icons";
import MakeOfferButton from "./MakeOfferButton";
import ViewOfferButton from "./ViewOfferButton";
import EditPostButton from "./EditPostButton";
const { Fragment } = React;
const { Text, Title } = Typography;
const PostView = props => {
  const {
    description,
    user,
    images,
    title,
    location,
    status,
    typeOfPet,
    service,
    startDate,
    endDate
  } = props.postDetails;
  const sessionUser = JSON.parse(localStorage.getItem("user"));
  return (
    <Row style={{ marginBottom: "20px" }}>
      <Col span={12}>
        <div style={{ borderRadius: "8px", width: "90%" }}>
          <Carousel>
            {images.map((link, i) => (
              <div key={i}>
                <FittedImage
                  fit="cover"
                  style={{
                    height: "500px",
                    borderRadius: "8px"
                  }}
                  src={link}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </Col>
      <Col span={12}>
        <div style={{ minHeight: "470px", paddingBottom: "10px" }}>
          <Row>
            <Col span={8}>
              <Link to={`/user/${user.accountID}`}>
                <Title level={2}>
                  <Avatar
                    size="large"
                    style={{
                      marginRight: "6px"
                    }}
                    icon={<UserOutlined />}
                  />
                  {user.name}{" "}
                </Title>
              </Link>
              <Text type="secondary"> 1 minute ago</Text> <br />
            </Col>
            <Col style={{ paddingTop: "2px" }} span={16}>
              {/* checks if is post creator or caretaker */}{" "}
              {sessionUser != null &&
              sessionUser.accountID === user.accountID ? (
                <ViewOfferButton {...props} />
              ) : (
                <MakeOfferButton {...props} />
              )}
              <Button
                style={{ marginRight: "15px", float: "right", width: "220px" }}
                size="large"
              >
                <strong>Chat</strong>
              </Button>
            </Col>
          </Row>
          <Title
            style={{
              marginTop: "30px"
            }}
            level={4}
          >
            {title}
          </Title>
          <EnvironmentOutlined />{" "}
          <Text>
            Location: <strong>{location}</strong>
          </Text>
          <span style={{ float: "right", paddingRight: "20px" }}>
            <InfoCircleOutlined />{" "}
            <Text className={`${status}`}>
              Status: <strong>{status}</strong>
            </Text>
          </span>
          <br />
          <Text>
            <QqOutlined /> Type of Pet: <strong>{typeOfPet}</strong>
          </Text>{" "}
          <br />
          <Text>
            <SmileOutlined /> Type of Service: <strong>{service}</strong>
          </Text>{" "}
          <br />
          <Text>
            <CalendarOutlined /> Date: <strong>{startDate}</strong> -{" "}
            <strong>{endDate}</strong>
          </Text>
          <br />
          <br />
          {description}
        </div>
        {/* check post.status == "pending service" and user
         == post create then show this button */}
        {sessionUser != null &&
        sessionUser.accountID === user.accountID &&
        status === "Pending Service" ? (
          <Tooltip title="Confirm Service Complete">
            <Button
              style={{
                float: "right",
                marginRight: "15px"
              }}
              shape="circle"
              icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
            />
          </Tooltip>
        ) : (
          " "
        )}

        {sessionUser != null &&
        sessionUser.accountID ===
          user.accountID /* if user is the post creator*/ ? (
          <Fragment>
            <Tooltip title="Delete Post">
              <Button
                style={{
                  float: "right",
                  marginRight: "15px"
                }}
                shape="circle"
                icon={<DeleteTwoTone twoToneColor="#EF2917" />}
              />
            </Tooltip>

            <EditPostButton {...props} />
          </Fragment>
        ) : (
          ""
        )}
      </Col>
    </Row>
  );
};

export default PostView;
