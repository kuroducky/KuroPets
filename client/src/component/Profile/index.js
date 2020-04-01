import React from "react";
import { Layout, Col, Row, Typography, Avatar, Rate, Tabs } from "antd";
import { UserOutlined } from "@ant-design/icons";
import EditProfileControl from "./EditProfileControl";
import PostTab from "./PostTab";
import OfferTab from "./OfferTab";

const mainPageStyles = {
  marginLeft: "5%",
  marginRight: "5%",
  marginTop: 60,
  padding: "2px 22px 0px 22px"
};

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

class ProfileControl extends React.Component {
  state = {
    user: {}
  };
  onUpdateForm = async values => {
    console.log(values);
    const response = await fetch(
      `http://172.21.148.170/api/user/${this.state.user.accountID}`,
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
    this.setState({ user: content });
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await fetch(`http://172.21.148.170/api/user/${id}`);
    const json = await response.json();
    const user = json[0];
    if (user) {
      delete user.password;
      this.setState({ user });
    }
    console.log(this.state);
  }
  callback = key => {
    console.log(key);
  };
  render() {
    const { user } = this.state;
    return (
      <Content style={mainPageStyles}>
        <div
          style={{
            marginTop: 80,
            minHeight: 380
          }}
        >
          <Row style={{ marginTop: "20px" }} gutter={16}>
            <Col style={{ marginTop: "20px" }} span={8}>
              <div style={{ textAlign: "center" }}>
                <Avatar
                  size={128}
                  style={{
                    margin: "0 6px 20px 0"
                  }}
                  icon={<UserOutlined />}
                />
                <Title style={{ margin: "0 0 0 0" }} level={1}>
                  {user.name}
                </Title>
                {user.rating ? (
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={user.rating}
                    // defaultValue={Math.floor(this.state.user.rating * 2) / 2}
                  />
                ) : (
                  ""
                )}
                <div style={{ margin: "30px 0 30px 0" }}>
                  <Text>
                    Contact me at: <strong>{user.phone}</strong>
                  </Text>
                  <br />
                  <Text>
                    Email me at: <strong>{user.email}</strong>
                  </Text>
                </div>
                {user.name &&
                user.accountID ===
                  JSON.parse(localStorage.getItem("user")).accountID ? (
                  <EditProfileControl
                    user={this.state.user}
                    onUpdateForm={this.onUpdateForm}
                    {...this.props}
                  />
                ) : (
                  ""
                )}
              </div>
            </Col>
            <Col span={16}>
              <div
                style={{
                  padding: "20px 22px 0px 22px",
                  marginBottom: "50px",
                  boxShadow:
                    "0 3px 10px 0 rgba(44,44,45,.07), inset 0 0 0 1px rgba(44,44,45,.07)",
                  borderRadius: "8px"
                }}
              >
                <Tabs
                  style={{ margin: "0 0 20px 0" }}
                  onChange={this.callback}
                  type="card"
                >
                  <TabPane tab="Posts" key="1">
                    <PostTab {...this.props} />
                  </TabPane>
                  <TabPane tab="Offers" key="2">
                    <OfferTab {...this.props} />
                  </TabPane>
                </Tabs>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
    );
  }
}

export default ProfileControl;
