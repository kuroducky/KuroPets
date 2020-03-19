import React from "react";
import { Button, Row, Col, Typography, Avatar, Rate } from "antd";
import {
  UserOutlined,
  WalletOutlined,
  DollarOutlined
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

const acceptOffer = id => {
  console.log("accepted offer from: ", id);
};
class OfferTab extends React.Component {
  render() {
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
                padding: "10px 10px",
                marginBottom: "15px"
                // minHeight: "90px"
              }}
            >
              <Row>
                <Col span={8}>
                  <Title style={{ marginBottom: "-2px" }} level={4}>
                    <Avatar
                      style={{
                        marginRight: "6px"
                      }}
                      icon={<UserOutlined />}
                    />
                    {offer.user.name}{" "}
                  </Title>
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={Math.floor(offer.user.rating * 2) / 2}
                  />
                </Col>
                <Col span={10}>
                  <span style={{ marginTop: "5px" }}>
                    <DollarOutlined /> Price:{" "}
                    <strong>${offer.price.toFixed(2)}</strong>
                  </span>{" "}
                  <br /> <WalletOutlined /> Payments:{" "}
                  {offer.paymentType
                    ? offer.paymentType.split(",").map((p, i) => {
                        if (i === 1)
                          return (
                            <span key={i}>
                              <strong>
                                , {p.replace(/^\w/, c => c.toUpperCase())}{" "}
                              </strong>
                            </span>
                          );
                        else
                          return (
                            <span key={i}>
                              <strong>
                                {p.replace(/^\w/, c => c.toUpperCase())}{" "}
                              </strong>
                            </span>
                          );
                      })
                    : ""}
                </Col>
                <Col span={6}>
                  <Button
                    block
                    style={{ marginBottom: "10px" }}
                    // size="large"
                    type="primary"
                    onClick={() => {
                      acceptOffer(offer.user.accountID);
                    }}
                  >
                    <strong>Accept</strong>
                  </Button>
                  <Button block>
                    <strong>Chat</strong>
                  </Button>
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
