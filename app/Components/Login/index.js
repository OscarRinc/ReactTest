import React, { Component } from 'react';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom';

class Login extends Component {
  state = {
    user: '',
    pass: ''
  };
  handleEvent = () => {
    console.log("Funciona :')'");
  };

  render() {
    const Container = styled.div`
      display: grid;
      justify-content: center;
      align-items: center;
      height: 6em;
      width: 100%;
      background: palevioletred;

      @media (max-width: 700px) {

      }
    `;
    const Form = styled.form`
      display: grid;
      justify-content: center;
      background: withe;
      padding: 10% 0 10% 0;
      margin: 0 40%;
      border: 2px solid palevioletred;
      border-radius: 4px;
    `;
    const Input = styled.input`
      padding: 0.5em;
      margin: 0.5em;
      color: palevioletred;
      background: papayawhip;
      border: none;
      border-radius: 3px;
    `;
    const Button = styled.button`
      background: ${props => props.primary ? 'palevioletred' : 'white'};
      color: ${props => props.primary ? 'white' : 'palevioletred'};

      font-size: 1em;
      margin: 1em;
      padding: 0.25em 1em;
      border: 2px solid palevioletred;
      border-radius: 3px;
    `;
    const Title = styled.p`
      color: white;
      font: 150% sans-serif;
    `;
    return (
      <div>
        <Container>
          <Title>
            TO DO LIST
          </Title>
        </Container>
        <br />
          <Form>
            <Input placeholder="User" type="text" />
            <Input placeholder="Password" type="password" />
            <Link to="/to-do-list">
              <Button onClick={this.handleEvent} primary>join</Button>
            </Link>
          </Form>
      </div>
    );
  }
}

export default Login;
