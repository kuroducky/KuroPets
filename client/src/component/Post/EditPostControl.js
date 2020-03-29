import React, { Fragment, useEffect } from "react";
import moment from "moment";
import { Button, Modal, Form, Input, Tooltip, DatePicker } from "antd";
import { EditTwoTone } from "@ant-design/icons";

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const EditPostView = ({ visible, onCancel, onUpdateForm, postDetails }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(postDetails);
  }, []);
  return (
    <Modal
      visible={visible}
      title="Existing Offers"
      cancelText="Cancel"
      okText="Done"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            onUpdateForm(values);
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      }}
      centered
      width="740px"
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public"
        }}
      >
        <Form.Item
          rules={[
            {
              required: true
            }
          ]}
          name={"title"}
          label="Title"
        >
          <Input />
        </Form.Item>
        <Form.Item name={"location"} label="Location">
          <Input />
        </Form.Item>
        <Form.Item name={"typeOfPet"} label="Type Of Pet">
          <Input />
        </Form.Item>
        <Form.Item name={"service"} label="Type Of Service">
          <Input />
        </Form.Item>
        <Form.Item name={"startEndDate"} label="Start and End Date">
          <RangePicker
            value={[moment(postDetails.startDate), moment(postDetails.endDate)]}
            size={"large"}
          />
        </Form.Item>
        <Form.Item name={"description"} label="Description">
          <TextArea
            autoSize={{ minRows: 4, maxRows: 7 }}
            placeholder="Briefly describe the service required..."
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
class EditPostControl extends React.Component {
  state = {
    visible: false
  };
  onUpdateForm = values => {
    if (values.startEndDate === undefined) {
      values.startEndDate = [
        moment(this.props.postDetails.startDate),
        moment(this.props.postDetails.endDate)
      ];
    }

    values.startDate = values.startEndDate[0].format("YYYY-MM-DDTHH:mm:ss"); // 2020-02-22T16:00:00.000Z
    values.endDate = values.startEndDate[1].format("YYYY-MM-DDTHH:mm:ss");
    values.status = "Pending Service";
    values.accountID = JSON.parse(localStorage.getItem("user")).accountID;
    delete values.startEndDate;
    this.props.updatePost(values);
    this.setState({ visible: false });
  };
  render() {
    return (
      <Fragment>
        <Tooltip title="Edit Post">
          <Button
            style={{
              float: "right",
              marginRight: "15px"
            }}
            shape="circle"
            icon={<EditTwoTone />}
            onClick={() => {
              this.setState({ visible: true });
            }}
          />
        </Tooltip>
        <EditPostView
          {...this.props}
          visible={this.state.visible}
          postDetails={this.props.postDetails}
          onCancel={() => {
            this.setState({ visible: false });
          }}
          onUpdateForm={this.onUpdateForm}
        />
      </Fragment>
    );
  }
}

export default EditPostControl;
