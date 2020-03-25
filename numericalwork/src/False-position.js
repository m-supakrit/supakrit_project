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
    title: 'Xl',
    dataIndex: 'Xl',
  },
  {
    title: 'Xr',
    dataIndex: 'Xr',
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



class Falseposition extends Component {
  constructor() {
    super();
    this.state = {
      fx: "",
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
  error(Xnew, Xold)  {
    console.log(Xnew)
    console.log(Xold)
    return Math.abs((Xnew - Xold) / Xnew);
  }
  test() {
    console.log('121212');
    axios.get("http://192.168.99.100:3001/users/2")
      .then((response) => {
        console.log(response.data[0].fx)
        this.setState({
          fx: response.data[0].fx,
          Xl: response.data[0].xl,
          Xr: response.data[0].xr,
        });

      })
  }
  Falsepositioncode() {
    let Xl = parseFloat(document.getElementById("Xl").value);
    let Xr = parseFloat(document.getElementById("Xr").value);
    let epsilon = parseFloat(0.000000);
    let round = 0;
    let Xi = 0
    let increaseFunction = false;
    if (this.func(Xl) < this.func(Xr)) {
      increaseFunction = true;
    }
    
    do {
      Xi = (Xl * this.func(Xr) - Xr * this.func(Xl)) / (this.func(Xr) - this.func(Xl));
      if (this.func(Xi) * this.func(Xr) < 0) {
        if(round!==0){
        epsilon = this.error(Xi, Xl);
        }
        if (increaseFunction) {
          Xl = Xi;
        }
        else {
          Xr = Xi;
        }

      }
      else {
        if(round!==0){
        epsilon = this.error(Xi, Xr);
        }
        if (increaseFunction) {
          Xr = Xi;
        }
        else {
          Xl = Xi;
        }

      }
      round++;
      
      data.push(
        {
          Iteration: round,
          Xl: Xl.toFixed(6),
          Xr: Xr.toFixed(6),
          X: Xi.toFixed(6),
          Error: epsilon.toFixed(6),
        }
      )
      
    } while (round===1||Math.abs(epsilon) > 0.000001)
    this.setState({ hello: true })

  }
  render() {
    return (
      <div>
        <Content style={{ marginTop: 40 }}>
          <Title underline style={{ color: "#1f1f1f", padding: '0 50px 0px' }} level={3}>False-position method</Title>
          <div style={{ marginTop: 50 }}></div>
          <form onChange={this.handleChange}>
            <Row>
              <Col xs={{ span: 1, offset: 1 }} lg={{ span: 3, offset: 1 }}>
                <InputNumber id="Xl" placeholder="Xl" size="large" />
              </Col>
              <Col xs={{ span: 1, offset: 1 }} lg={{ span: 3, offset: 1 }}>
                <InputNumber id="Xr" placeholder="Xr" size="large" />
              </Col>
              <Col xs={{ span: 1, offset: 1 }} lg={{ span: 4, offset: 1 }}>
                <Input name="fx" id="fx" placeholder="fx" size="large" />
              </Col>
            </Row>
            <Row style={{ marginTop: 50 }}>
              <Col xs={{ span: 1, offset: 1 }} lg={{ span: 1, offset: 1 }}>
                <Button onClick={() => this.Falsepositioncode()} type="primary" size="large">Enter</Button>
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

export default Falseposition;
