import React from 'react';
import styled from 'styled-components';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  increment,
  decrement
} from '../../modules/counter';

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
const Title = styled.p`
  color: white;
  font: 150% sans-serif;
`;
const Content = styled.div`
  display: grid;
  justify-content: center;
  background: withe;
  padding: 10% 0 10% 0;
  margin: 0 40%;
  border: 2px solid palevioletred;
  border-radius: 4px;
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
const List = props => (
  <div>
    <Container>
      <Title>LIST</Title>
    </Container>
    <br />
    <Content>
        <Button onClick={props.increment} disabled={props.isIncrementing}>
          Add
        </Button>
        <Button onClick={props.decrement} disabled={props.isDecrementing}>
          Remove
        </Button>
        <Button onClick={() => props.changePage()}>
          Return
        </Button>
        <p>Count: {props.count}</p>
    </Content>
  </div>
);

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      decrement,
      changePage: () => push('/')
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(List);
