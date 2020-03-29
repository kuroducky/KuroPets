import React from "react";
import { Button, Modal, Row, Col, Typography, Avatar, Rate, Empty } from "antd";
import {
  UserOutlined,
  WalletOutlined,
  DollarOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";

const { Title } = Typography;

const OfferView = ({ visible, onCancel, offers, acceptOffer }) => {
  return (
    <Modal
      visible={visible}
      title="Existing Offers"
      cancelText="Cancel"
      okText="Done"
      onCancel={onCancel}
      onOk={onCancel}
      centered
      width="740px"
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <div
        style={{
          maxHeight: "500px",
          overflow: "auto",
          padding: "8px 24px"
        }}
      >
        {offers.length == 0 ? (
          <Empty />
        ) : (
          offers.map((offer, key) => {
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
                  <Col style={{ textAlign: "center" }} span={6}>
                    {offer.status === "Pending" ? (
                      <Button
                        block
                        style={{ marginBottom: "10px" }}
                        // size="large"
                        type="primary"
                        onClick={() => {
                          acceptOffer(offer.offerID);
                        }}
                      >
                        <strong>Accept</strong>
                      </Button>
                    ) : (
                      <Title style={{ color: "green" }} level={4}>
                        <CheckCircleOutlined /> Accepted
                      </Title>
                    )}

                    <Button block>
                      <strong>Chat</strong>
                    </Button>
                  </Col>
                </Row>
              </div>
            );
          })
        )}
      </div>
    </Modal>
  );
};

class ViewOfferButton extends React.Component {
  state = {
    visible: false,
    offers: []
  };
  acceptOffer = async id => {
    console.log("accepted offer from: ", id);
    const response = await fetch(`http://172.21.148.170/api/offer/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: "Accepted" })
    });

    const content = await response.json();
    console.log(content);

    this.setState({ visible: false });
    window.location.reload();
  };
  async componentDidMount() {
    const response = await fetch(
      `http://172.21.148.170/api/post/${this.props.postID}/offer`
    );
    const json = await response.json();
    console.log("offers", json);
    this.setState({ offers: json });
  }
  render() {
    return (
      <div>
        <Button
          style={{ float: "right", width: "220px" }}
          size="large"
          type="primary"
          onClick={() => {
            this.setState({ visible: true });
          }}
        >
          <strong>View Offers</strong>
        </Button>
        <OfferView
          {...this.props}
          offers={this.state.offers}
          visible={this.state.visible}
          acceptOffer={this.acceptOffer}
          onCancel={() => {
            this.setState({ visible: false });
          }}
        />
      </div>
    );
  }
}
export default ViewOfferButton;
