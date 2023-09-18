import React, { useState } from "react";
import { Button, Divider, Form, Input, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const onFinish = async () => {
    try {
      const resp = await axios.post(
        `http://localhost:8000/api/auth/login`,
        userInfo
      );
      messageApi.open({
        type: "success",
        content: "Login success!",
      });
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", resp.data.token);
      navigate("dashboard");
    } catch (err: any) {
      if (err.response) {
        // The client was given an error response (5xx, 4xx)
        messageApi.open({
          type: "error",
          content: err.response.data.message,
        });
      }
    }
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
      {contextHolder}
      <Form
        name="basic"
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
          <Input
            value={userInfo.username}
            onChange={(event) =>
              setUserInfo({ ...userInfo, username: event.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={userInfo.password}
            onChange={(event) =>
              setUserInfo({ ...userInfo, password: event.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            // onClick={() => {
            //   localStorage.setItem("isLoggedIn", "true");
            //   navigate("dashboard");
            // }}
          >
            Submit
          </Button>
          <Divider style={{ borderColor: "black" }} />
          <Link to={`signup`}>Sign Up</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
