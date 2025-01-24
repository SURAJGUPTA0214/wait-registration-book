import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  notification,
  Row,
  Tooltip,
} from "antd";
import InviteCode from "./inviteCode";
import WaitingList from "./waitingList";
import { useDispatch } from "react-redux";
import { addFormSubmission } from "./waitingRegistrationSlice";
import { InfoCircleOutlined } from "@ant-design/icons";

const WaitingRegistration = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const handleSubmit = (values) => {
    dispatch(
      addFormSubmission({
        username: values.username,
        inviteCode: values.code,
        auto: false,
      })
    );

    const validCodes = ["austin234", "alvin145", "karthik321"];

    if (validCodes.includes(values.code)) {
      api.success({
        message: "Success",
        description: "Your Code is Valid!",
        placement: "top",
      });
    } else {
      api.error({
        message: "Error",
        description: "Your code is Invalid, You are moving to Waiting List",
        placement: "top",
      });
    }

    form.resetFields();
  };

  return (
    <>
      {contextHolder}
      <div className="d-flex mb-30">
        <h4 className="content-main-heading">Waiting Registration</h4>
      </div>

      <Card>
        <Form
          layout="vertical"
          form={form}
          autoComplete="off"
          onFinish={handleSubmit}
          onChange={() => {}}
          className="mt-12"
        >
          <Col span={24}>
            <Form.Item
              name={["username"]}
              label="Username"
              rules={[{ required: true, message: "Username is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name={["code"]}
              // label="Invite Code"
              label={
                <span className="d-flex align-items-center">
                  Invite Code
                  <Tooltip
                    placement="top"
                    className="ml-10"
                    title={"use these code austin234, alvin145, karthik321"}
                  >
                    <InfoCircleOutlined className="font-18" />
                  </Tooltip>
                </span>
              }
              rules={[{ required: true, message: "Invite Code is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Button type="primary" onClick={() => form.submit()}>
            Submit
          </Button>
        </Form>
      </Card>

      <Row gutter={[16, 16]} className="mt-2">
        <Col xs={24} sm={12} md={12}>
          <InviteCode />
        </Col>

        <Col xs={24} sm={12} md={12}>
          <WaitingList />
        </Col>
      </Row>
    </>
  );
};

export default WaitingRegistration;
