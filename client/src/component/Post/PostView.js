import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Button,
  Row,
  Col,
  Carousel,
  Typography,
  Avatar,
  Tooltip,
  Popconfirm
} from "antd";
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
  ExclamationCircleOutlined,
  SmileOutlined
} from "@ant-design/icons";
import MakeOfferControl from "./MakeOfferControl";
import ViewOfferControl from "./ViewOfferControl";
import EditPostControl from "./EditPostControl";
import CompleteServiceControl from "./CompleteServiceControl";
const { Fragment } = React;
const { Text, Title } = Typography;

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
const PostView = props => {
  const {
    description,
    user,
    timestamp,
    images,
    title,
    location,
    status,
    typeOfPet,
    service,
    startDate,
    endDate
  } = props.postDetails;
  const { updatePost } = props;
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
              <Text type="secondary"> {calculateDiff(timestamp)}</Text> <br />
            </Col>
            <Col style={{ paddingTop: "2px" }} span={16}>
              {/* checks if is post creator or caretaker */}{" "}
              {sessionUser != null &&
              sessionUser.accountID === user.accountID ? (
                <ViewOfferControl {...props} />
              ) : (
                <MakeOfferControl {...props} />
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
            <CalendarOutlined /> Date:{" "}
            <strong>{moment(startDate).format("DD MMM YYYY")}</strong> -{" "}
            <strong>{moment(endDate).format("DD MMM YYYY")}</strong>
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
            <CompleteServiceControl {...props} />
          </Tooltip>
        ) : (
          " "
        )}

        {sessionUser != null &&
        sessionUser.accountID ===
          user.accountID /* if user is the post creator*/ ? (
          <Fragment>
            <Popconfirm
              title="Are you sure you want to delete?"
              icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => {
                const { postID } = props.postDetails;
                fetch("http://172.21.148.170/api/post/" + postID, {
                  method: "DELETE"
                }).then(res => {
                  console.log(res);
                  props.history.push("/");
                });
              }}
              onCancel={() => {
                console.log("cancel");
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{
                  float: "right",
                  marginRight: "15px"
                }}
                shape="circle"
                icon={<DeleteTwoTone twoToneColor="#EF2917" />}
              />
            </Popconfirm>

            <EditPostControl {...props} />
          </Fragment>
        ) : (
          ""
        )}
      </Col>
    </Row>
  );
};

export default PostView;
