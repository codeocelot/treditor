import React from 'react'
import ReactDOM from 'react-dom'
import Actions from '../actions/actions'
import Store from '../stores/store'
import Constants from '../constants/constants'

export default class Node extends React.Component{
  constructor(props){
    super(props);
    console.log(props)
    this.props = props;
    // debugger;
    this.state = {
      value:'',
      shift:false
    }
  }
  componentDidMount = () => {
    this.setState({
      value:this.props.model.value
    });
    ReactDOM.findDOMNode(this.refs.input).focus()
    Store.listen((type,payload)=>{
      switch(type){
        case 'UPDATE':
        break;
        case 'FOCUS':
        if(payload.model.id === this.props.model.id){
          ReactDOM.findDOMNode(this.refs.input).focus();
        }
        break;
      }
    })
  }
  fmtChildren = (children) =>{
    return children.map(c=>{return(<Node {...c}/> )})
  }
  handleInput = (evt) =>{
    this.setState({value:evt.target.value})
    Actions.update(this.props.model.id,this.state.value)
  }
  handleNewChild = () =>{
    Actions.create(this.props.model.id,'')
  }
  handleDelete = () =>{
    Actions.remove(this.props.model.id);
  }
  handleKeyPress = (evt) => {
    switch(evt.key){
      case 'Enter':
          Actions.create(this.props.model.id,'');
        break;
      case 'ArrowLeft':
        Actions.refocus(Constants.LEFT,this.props.model.id);
        break;
      case 'ArrowRight':
        Actions.refocus(Constants.RIGHT,this.props.model.id);
        break;
      case 'ArrowUp':
        Actions.refocus(Constants.UP,this.props.model.id);
        break;
      case 'ArrowDown':
        Actions.refocus(Constants.DOWN,this.props.model.id);
        break;
      case 'Shift':
        this.setState({shift:true});
        break;
      default:
        break;
    }
  }

  render = () =>{
    var children = this.props.children? this.props.children.map(node=><Node key={node.model.id}{...node} />) : '';

    return(
      <li>
        <button onClick={this.handleNewChild} >Add new child</button>
        <button onClick={this.handleDelete} >Remove </button>
        <input type="text" onChange={this.handleInput} value={this.state.value} ref="input" onKeyDown={this.handleKeyPress} />

        <ol>
          {children}
        </ol>
      </li>
    )
  }
}
