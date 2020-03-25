import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb, Switch } from 'antd';
import { CodepenOutlined, AntDesignOutlined, AppstoreAddOutlined, BuildFilled, HomeOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { Button } from 'antd';
import Bisection from './Bisection';
import Falseposition from './False-position';
import Onepoint from './One-point';
import Newtonrapshon from './Newton-raphson';
import Secant from './Secant';
import ReactDOM from 'react-dom';
import Home from './Home';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

const { Title } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends Component {
  select = (event) => {
    if (event.key == 1) {
      ReactDOM.render(<Bisection />, document.getElementById("show"));
    }
    if (event.key == 2) {
      ReactDOM.render(<Falseposition />, document.getElementById("show"));
    }
    if (event.key == 3) {
      ReactDOM.render(<Onepoint />, document.getElementById("show"));
    }
    if (event.key == 4) {
      ReactDOM.render(<Newtonrapshon />, document.getElementById("show"));
    }
    if (event.key == 5) {
      ReactDOM.render(<Secant />, document.getElementById("show"));
    }
  }
  render() {
    return (
      <Layout>
        <Header style={{ background: "#531dab" }} >

          <Title style={{ lineHeight: '56px', textAlign: 'center', color: "white", fontWeight: "800", }}
            level={1}><BuildFilled spin />  Numerical method  <BuildFilled spin />

          </Title>

        </Header>
        <Layout>
          <Sider width={280} className="site-layout-background">
            <Menu
              mode="inline"
              theme="dark"
              defaultSelectedKeys={['0']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0, background: "#161d40" }}
            >
              
                  <Menu.Item key="99">
                    <HomeOutlined />
                    <span>Home</span>
                  </Menu.Item>
    
                
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <CodepenOutlined />
                Root of equations
              </span>
                }
              >
                <Menu.Item onClick={this.select} key="1">Bisection method</Menu.Item>
                <Menu.Item onClick={this.select} key="2">False-position method</Menu.Item>
                <Menu.Item onClick={this.select} key="3">One-point Iteration method</Menu.Item>
                <Menu.Item onClick={this.select} key="4">Newtan-raphson method</Menu.Item>
                <Menu.Item onClick={this.select} key="5">Secant method</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <AntDesignOutlined />
                Linear Algebra
              </span>
                }
              >
                <Menu.Item key="6">Cholesky decomposition</Menu.Item>
                <Menu.Item key="7">Cramer rule</Menu.Item>
                <Menu.Item key="8">Gauss elimination</Menu.Item>
                <Menu.Item key="9">Conjugate gradient</Menu.Item>
                <Menu.Item key="10">Inverse</Menu.Item>
                <Menu.Item key="11">Jacobi</Menu.Item>
                <Menu.Item key="12">Gauss jordan elimination</Menu.Item>
                <Menu.Item key="13">LU decomposition</Menu.Item>
                <Menu.Item key="14">Gauss seidel </Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub3"
                title={
                  <span>
                    <AppstoreAddOutlined />
                Interpolation
              </span>
                }
              >
                <Menu.Item key="15">Newton</Menu.Item>
                <Menu.Item key="16">Lagrange</Menu.Item>
                <Menu.Item key="17">Spline</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={
                  <span>
                    <AppstoreAddOutlined />
                Integration
              </span>
                }
              >
                <Menu.Item key="18">CompositeSimpson</Menu.Item>
                <Menu.Item key="19">CompositeTrapseidel</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 0px 0px' }}>
            <Content style={{ padding: '0 0px 800px', margin: '0 0px', background: "#b37feb" }}>
              <div id="show"></div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
