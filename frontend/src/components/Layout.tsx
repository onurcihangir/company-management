import React from "react";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

export type LayoutItemsProps = {
  key: string;
  label: string;
  element: React.FunctionComponent;
  //   icon: FunctionComponentElement<Pick<any>>;
};

const AppLayout: React.FC<{
  items: LayoutItemsProps[];
  item?: React.FunctionComponent<{}>;
}> = ({ items, item }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout style={{ height: "100vh", width: "100%" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items.map((item) => ({
            key: item.key,
            // icon: React.createElement(icon),
            label: item.label,
          }))}
          onClick={({ key }) => {
            navigate(key);
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Button
            style={{ marginRight: 50 }}
            type="primary"
            htmlType="submit"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("isLoggedIn");
              navigate("/");
            }}
          >
            Logout
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              //   height: "100vh",
              //   width: "100%",
              display: "flex",
              // flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              background: colorBgContainer,
            }}
          >
            {/* @ts-ignore */}
            {item}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
