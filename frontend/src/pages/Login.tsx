import React from "react";
import { Button, Divider, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Form
        name="basic"
        //   labelCol={{ span: 8 }}
        //   wrapperCol={{ span: 16 }}
        style={{
          maxWidth: 600,
          boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.3)",
          padding: "0px 16px 16px 16px",
          borderRadius: "16px",
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Typography.Title>Login</Typography.Title>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          onClick={() => {
            localStorage.setItem("isLoggedIn", "true");
            navigate("dashboard");
          }}
        >
          Submit
        </Button>
        <Divider style={{ borderColor: "black" }} />
        <Link to={`signup`}>Sign Up</Link>
      </Form>
    </div>
  );
};

export default Login;
