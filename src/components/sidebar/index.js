import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { BookOutlined, UserAddOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check window width on mount and resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true); // Collapse sidebar on mobile
      } else {
        setCollapsed(false); // Expand sidebar on desktop
      }
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Run handleResize once on component mount to set initial state
    handleResize();

    // Cleanup the event listener when component is unmounted
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
        <Menu.Item key="/" onClick={() => navigate('/')}>
          <UserAddOutlined />
          <span className="nav-text">Waiting Registration</span>
        </Menu.Item>
        <Menu.Item key="/status" onClick={() => navigate('/status')}>
          <BookOutlined />
          <span className="nav-text">Status</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
