import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, NavLink, useNavigate } from "react-router-dom";
import MyCalendar from './Containers/MyCalendar';
import Add from './Containers/Add';
import Signin from './Containers/Sign_in';
import Graph from './Containers/PieChart';
import Property from './Containers/Property';
import { Layout, Menu, Typography } from 'antd';
import {
  BarChartOutlined,
  SettingOutlined,
  EnvironmentOutlined,
  InsertRowAboveOutlined,
  DollarOutlined,
  ScheduleOutlined,
  ImportOutlined
} from '@ant-design/icons';
import "./Css/Menu.css"
import axios from './axios.js'
import Budget from './Containers/Budget';
import Map from './Containers/Map/Map';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Title, Text } = Typography;

let LOCALSTORAGE_KEY = "";
let LOCALSTORAGE_KEY2 = "false";
function App() {
  const savedUsername = localStorage.getItem(LOCALSTORAGE_KEY);
  const savedLogin = localStorage.getItem(LOCALSTORAGE_KEY2);
  const [login, setLogin] = useState(savedLogin);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(savedUsername);
  const [confirmpassword, setConfirmpassword] = useState("");
  console.log(typeof (login));
  let navigate = useNavigate();
  const setvalue = () => {
    localStorage.setItem(LOCALSTORAGE_KEY, username);
    localStorage.setItem(LOCALSTORAGE_KEY2, login);
  }
  useEffect(() => {
    if (login === "true") {
      setvalue()
      console.log(login)
    }
    console.log("test")
  }, [login]);
  const handleLogout = () => {
    localStorage.setItem(LOCALSTORAGE_KEY, "");
    localStorage.setItem(LOCALSTORAGE_KEY2, "false");
    setUsername("")
    setLogin((login) => { return login = "false" })
    navigate('/signin')
  }
  console.log(login)
  return (
    (login === "true" ?
      <div>
        <Layout>
          <Sider style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}>
            <Header style={{ padding: "0 0" }}>
              <Title level={3} style={{ marginTop: "0.5em", marginLeft: "0.5em", color: "white" }}>{username}</Title>
            </Header>
            <Menu theme="dark" mode="inline">
              <Menu.Item key='1' style={{ height: '100px', fontSize: '40px', margin: '0px', background: '#971d1d' }}>
                <NavLink to="/add" />
                +
              </Menu.Item>
              <Menu.Item key='2' style={{ height: '60px', fontSize: '20px', marginTop: '0px' }} icon={<InsertRowAboveOutlined style={{ fontSize: '110%' }} />}>
                <NavLink to="/calendar" />
                日曆
              </Menu.Item>
              <Menu.Item key='3' style={{ height: '60px', fontSize: '20px' }} icon={<BarChartOutlined style={{ fontSize: '110%' }} />}>
                <NavLink to="/graph" />
                圖表
              </Menu.Item>
              <Menu.Item key='4' style={{ height: '60px', fontSize: '20px' }} icon={<DollarOutlined style={{ fontSize: '110%' }} />}>
                <NavLink to="/property" />
                資產
              </Menu.Item>
              <Menu.Item key='5' style={{ height: '60px', fontSize: '20px' }} icon={<EnvironmentOutlined style={{ fontSize: '110%' }} />}>
                <NavLink to="/map" />
                地圖
              </Menu.Item> 
              {/* <Menu.Item key='6' style={{ height: '60px', fontSize: '20px' }} icon={<ScheduleOutlined style={{ fontSize: '110%' }} />}>
                <NavLink to="/budget" />
                ???�?
              </Menu.Item> */}
              {/* <Menu.Item key='7' style={{ height: '60px', fontSize: '20px' }} icon={<SettingOutlined style={{ fontSize: '110%' }} />}>
                <NavLink to="/setting" />
                設�??
              </Menu.Item> */}
              <SubMenu key="sub1" title="登出" style={{ height: '60px', fontSize: '20px' }} icon={<ImportOutlined style={{ fontSize: '110%' }} />}>
                <Menu.Item key="登出" onClick={() => handleLogout()}>確認</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial', textAlign: 'center' }}>
              <Routes>
                <Route exact path="/calendar" element={<MyCalendar username={username} />} />
                <Route exact path="/add" element={<Add username={username} />} />
                <Route exact path="/graph" element={<Graph username={username} />} />
                <Route exact path="/property" element={<Property username={username} />} />
                {/* <Route exact path="/budget" element={<Budget username={username} />} /> */}
                <Route exact path="/map" element={<Map username={username}/>} />
                <Route path="/" element={<Navigate to="/calendar" />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </div>
      :
      <div>
        <Routes>
          <Route exact path="/signin" element={<Signin login2={login} Login={setLogin} password={password} username={username} confirmpassword={confirmpassword} setPassword={setPassword} setConfirmpassword={setConfirmpassword} setUsername={setUsername} />} />
          <Route path="/" element={<Navigate to="/signin" />} />
        </Routes>
      </div>
    ))
}


export default App;
