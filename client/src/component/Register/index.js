import React from "react";
import { Layout, Form, Input, Checkbox, Button, message } from "antd";
import { login, register } from "../../Auth";
const { Content } = Layout;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

const RegistrationForm = ({ history }) => {
  const [form] = Form.useForm();

  const onFinish = async values => {
    delete values.agreement;
    delete values.confirm;
    const content = await register(values);

    console.log(content);
    if (content.querySuccess) {
      form.resetFields();
      const { name, password } = content.data;
      let success = await login(name, password);
      if (success) {
        history.push("/");
      } else {
        message.error("Incorrect Username or Password");
      }
    } else {
      message.error("The Username already exists");
    }

    console.log("Received values of form: ", values);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Username"
        rules={[
          {
            required: true,
            message: "Please input your username"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!"
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!"
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        {...tailFormItemLayout}
      >
        <Checkbox>I have read the agreement</Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
const mainPageStyles = {
  marginLeft: "32%",
  marginRight: "32%",
  marginTop: 120,
  boxShadow:
    "0 3px 10px 0 rgba(44,44,45,.07), inset 0 0 0 1px rgba(44,44,45,.07)",
  borderRadius: "8px",
  padding: "2px 22px 0px 0px"
};
class Register extends React.Component {
  render() {
    return (
      <Content style={mainPageStyles}>
        <div
          style={{
            marginTop: 24,
            minHeight: 380
          }}
        >
          <RegistrationForm {...this.props} />
        </div>
      </Content>
    );
  }
}

export default Register;
