import React from "react";
import FittedImage from "react-fitted-image";
import { Button, Row, Col, Typography, Tooltip, Popconfirm } from "antd";
import {
  DollarCircleOutlined,
  InfoCircleOutlined,
  CheckCircleTwoTone,
  CheckCircleOutlined
} from "@ant-design/icons";

const { Title } = Typography;
const offers = [
  {
    user: { name: "Johnny", accountID: "22", rating: 3 },
    price: 300,
    payment: ["cash", "paylah"],
    status: "pending"
  },
  {
    user: { name: "Scrappy", accountID: "23", rating: 2.1 },
    price: 400,
    payment: ["cash"],
    status: "pending"
  },
  {
    user: { name: "Skippy", accountID: "24", rating: 4.4 },
    price: 320.4,
    payment: ["paylah"],
    status: "pending"
  },
  {
    user: { name: "Sandy", accountID: "25", rating: 3.3 },
    price: 310,
    payment: ["cash", "paylah"],
    status: "pending"
  },
  {
    user: { name: "tommy", accountID: "26", rating: 3.2 },
    price: 300,
    payment: ["cash"],
    status: "pending"
  },
  {
    user: { name: "Sally", accountID: "27", rating: 4.6 },
    price: 400,
    payment: ["paylah"],
    status: "pending"
  }
];

class OfferTab extends React.Component {
  state = {
    offers: []
  };
  viewPost = id => {
    this.props.history.push(`/post/${id}`);
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await fetch(`http://172.21.148.170/api/user/${id}/offer`);
    const json = await response.json();
    console.log(json);
    this.setState({ offers: json });
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

    const { offers } = this.state;
    const sessionUser = JSON.parse(localStorage.getItem("user"));
    return (
      <div
        style={{
          maxHeight: "600px",
          overflow: "auto",
          padding: "8px 24px"
        }}
      >
        {offers.map((offer, key) => {
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
                      offer.post.images[0]
                        ? offer.post.images[0]
                        : "/placeholder-tb.png"
                    }
                  />
                </Col>
                <Col span={12}>
                  <Title level={3}>{offer.post.title}</Title>
                  {truncateString(offer.post.description, 130)}
                </Col>
                <Col span={6}>
                  <Button
                    block
                    size="large"
                    style={{ marginBottom: "10px" }}
                    // size="large"
                    type="primary"
                    onClick={() => {
                      this.viewPost(offer.postID);
                    }}
                  >
                    <strong>View Full Post</strong>
                  </Button>
                  <InfoCircleOutlined /> Offer Status:{" "}
                  {offer.status === "Accepted" ? (
                    <span style={{ color: "green" }}>
                      <strong>{offer.status} </strong>
                    </span>
                  ) : (
                    <strong>{offer.status} </strong>
                  )}
                  <br />
                  <DollarCircleOutlined /> Offer Price:{" "}
                  <strong>${offer.price} </strong>
                  <br />
                </Col>
              </Row>
            </div>
          );
        })}
      </div>
    );
  }
}

export default OfferTab;
