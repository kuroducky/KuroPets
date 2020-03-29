import React, { useState } from "react";
import { Button, Modal, Rate, Typography, Form, message } from "antd";

import { CheckCircleTwoTone } from "@ant-design/icons";
const { Text } = Typography;
const CompleteServiceView = ({ visible, onCompleteService, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Confirm the service is completed?"
      okText="Confirm"
      cancelText="Cancel"
      onCancel={onCancel}
      centered
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCompleteService(values);
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        style={{ textAlign: "center" }}
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public"
        }}
      >
        <Text>How would you rate the experience?</Text>
        <Form.Item
          name="rating"
          rules={[
            {
              required: true,
              message: "Please rate the experience!"
            }
          ]}
        >
          <Rate />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CompleteServiceControl = props => {
  const [visible, setVisible] = useState(false);
  console.log("complete button props: ", props);

  const onCompleteService = async values => {
    // values contains ratings

    // POST to change post status
    const response = await fetch(
      `http://172.21.148.170/api/post/${props.postID}/complete`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );

    const content = await response.json();
    console.log("post complete", content);
    // POST to change rating of caretaker

    const responseRate = await fetch(
      `http://172.21.148.170/api/user/${props.offers[0].accountID}/rate`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      }
    );
    const contentRate = await responseRate.json();
    console.log("rate", contentRate);
    message.success("Rating received!");
    setVisible(false);
    window.location.reload();
  };
  // const onCreate = async values => {
  //   values.accountID = JSON.parse(localStorage.getItem("user")).accountID;
  //   console.log(values);
  //   const response = await fetch(`http://172.21.148.170/api/offer/${postID}`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(values)
  //   });

  //   // const content = await response.json();'
  //   message.success("Offer received!");
  //   console.log("Received values of form: ", response);
  //   setVisible(false);
  // };

  return (
    <div>
      <Button
        onClick={() => {
          if (localStorage.getItem("user")) setVisible(true);
          else message.warning("Please Login first");
        }}
        style={{
          float: "right",
          marginRight: "15px"
        }}
        shape="circle"
        icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
      />
      <CompleteServiceView
        visible={visible}
        onCompleteService={onCompleteService}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default CompleteServiceControl;
