import React from 'react';
import ReactDOM from 'react-dom';
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
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;
const UL = styled.ul`
  color: palevioletred;
  font: sans-serif;
`;

let todoItems = [];

class TodoList extends React.Component {
  render () {
    let items = this.props.items.map((item, index) => {
      return (
        <TodoListItem key={index} item={item} index={index}
        	removeItem={this.props.removeItem}
        	markTodoDone={this.props.markTodoDone} />
      );
    });
    return (
      <UL> {items} </UL>
    );
  }
}

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickClose() {
    let index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone() {
    let index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  render () {
    let todoClass = this.props.item.done ?
        "done" : "undone";
    return(
      <li>
        <div>
          <span aria-hidden="true"
          	onClick={this.onClickDone}></span>
          {this.props.item.value}
          <Button type="button"
          	onClick={this.onClickClose}>&times;</Button>
        </div>
      </li>
    );
  }
}

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.itemName).focus();
  }
  onSubmit(event) {
    event.preventDefault();
    var input = ReactDOM.findDOMNode(this.refs.itemName);
    var newItemValue = input.value;
    if(newItemValue) {
      this.props.addItem({newItemValue});
      input.value = '';
    }
  }
  render () {
    return (
      <form onSubmit={this.onSubmit} >
        <Input type="text" ref="itemName"
        	placeholder="add new item"/><br />
        <Button type="submit" primary >Add</Button>
      </form>
    );
  }
}

class TodoApp extends React.Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {todoItems: todoItems};
  }
  addItem(todoItem) {
    todoItems.unshift({
      index: todoItems.length+1,
      value: todoItem.newItemValue,
      done: false
    });
    this.setState({todoItems: todoItems});
  }
  removeItem (itemIndex) {
    todoItems.splice(itemIndex, 1);
    this.setState({todoItems: todoItems});
  }
  markTodoDone(itemIndex) {
    let todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({todoItems: todoItems});
  }
  render() {
    return (
      <div id="main">
        <TodoForm addItem={this.addItem} />
        <TodoList items={this.props.initItems}
        	removeItem={this.removeItem}
        	markTodoDone={this.markTodoDone}/>
      </div>
    );
  }
}


const List = props => (
  <div>
    <Container>
      <Title>LIST</Title>
    </Container>
    <br />
    <Content>
      <center>
        <TodoApp initItems={todoItems}/>
      </center>
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
