import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import { Input } from 'antd';
import { InputNumber } from 'antd';
import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { Typography } from 'antd';
import * as math from 'mathjs';
var data = [];

const axios = require("axios")
const { Title } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const columns = [
  {
    title: 'Iteration',
    dataIndex: 'Iteration',
  },
  {
    title: 'X',
    dataIndex: 'X',
  },
  {
    title: 'Error',
    dataIndex: 'Error',
  },
];



class Newtonraphson extends Component {
  constructor() {
    super();
    this.state = {
      fx: "",
      X0: "0",
      hello: false
    }
    this.func = this.func.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  func(X) {
    let expr = math.compile(this.state.fx);
    let scope = { x: parseFloat(X) };
    return expr.eval(scope);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  funcDiff(X) {
    let expr = math.derivative(this.state.fx, 'x');
    let scope = {x:parseFloat(X)};
    return expr.eval(scope); 
}
  error(Xnew, Xold) {
    return Math.abs((Xnew - Xold) / Xnew).toFixed(6);
  }
  test() {
    console.log('121212');
    axios.get("http://192.168.99.100:3001/users/4")
      .then((response) => {
        console.log(response.data[0].fx)
        this.setState({
          fx: response.data[0].fx,
          X0: response.data[0].x0,
        });

      })
  }
  Newtonraphsoncode() {
    let X = parseFloat(document.getElementById("X0").value);
    let Xold = X
    let Xnew = 0
    let epsilon = parseFloat(0.000000);
    let round = 0;
    console.log(X,Xold)
    do {
      Xnew = Xold - (this.func(Xold) / this.funcDiff(Xold));
      console.log(this.func(Xold),this.funcDiff(Xold))
      epsilon = this.error(Xnew, Xold)
      round++
      Xold = Xnew;
      console.log(X,Xold)
      console.log(Xnew)
      data.push(
        {
          Iteration: round,
          X: Xnew.toFixed(6),
          Error: epsilon,
        }
      )

    } while (Math.abs(epsilon) > 0.000001);
    this.setState({ hello: true })
  }
  render() {
    return (
      <div>
        <Content style={{ marginTop: 40 }}>
          <Title underline style={{ color: "#1f1f1f", padding: '0 50px 0px' }} level={3}>Newton-raphson method</Title>
          <div style={{ marginTop: 50 }}></div>
          <form onChange={this.handleChange}>
            <Row>
              <Col xs={{ span: 1, offset: 1 }} lg={{ span: 3, offset: 1 }}>
                <InputNumber id="X0" placeholder="X0" size="large" />
              </Col>
              <Col xs={{ span: 1, offset: 1 }} lg={{ span: 4, offset: 1 }}>
                <Input name="fx" id="fx" placeholder="fx" size="large" />
              </Col>
            </Row>
            <Row style={{ marginTop: 50 }}>
              <Col xs={{ span: 1, offset: 1 }} lg={{ span: 1, offset: 1 }}>
                <Button onClick={() => this.Newtonraphsoncode()} type="primary" size="large">Enter</Button>
              </Col>
              <Col xs={{ span: 2, offset: 1 }} lg={{ span: 1, offset: 1 }}>
                <Button onClick={() => this.test()} type="primary"size="large">Example</Button>
              </Col>
            </Row>
          </form>
        </Content>
        {this.state.hello && <Table style={{ marginTop: 50, padding: '0 50px 0px' }} columns={columns} dataSource={data} />}
      </div>
    );
  }
}

export default Newtonraphson;
