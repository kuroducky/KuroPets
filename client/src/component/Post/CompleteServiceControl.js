import React, { useState } from "react";
import { Button, Modal, Rate, Form, message } from "antd";

import { CheckCircleTwoTone } from "@ant-design/icons";
{
  /* <Button
style={{
  float: "right",
  marginRight: "15px"
}}
shape="circle"
icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
/> */
}

const CompleteServiceView = ({ visible, onRate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="How would you rate the experience?"
      okText="Rate"
      cancelText="Cancel"
      onCancel={onCancel}
      centered
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onRate(values);
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

  const onRate = values => {
    console.log(values);
    message.success("Rating received!");
    setVisible(false);
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
        onRate={onRate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default CompleteServiceControl;
