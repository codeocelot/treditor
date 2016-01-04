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
    if(evt.target.key==='ArrowLeft'){
      console.log('Arrow left!!!!!<-----------------------')
    }
    this.setState({value:evt.target.value})
    Actions.update(this.props.model.id,evt.target.value)
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
    var children = this.props.children? this.props.children.map(node=><Node key={node.model.id}{...node} showId={this.props.showId} />) : '';
    var id = this.props.showId? <span>ID: {this.props.model.id}</span> : '';
    return(
      <li>
        {id}
        <button onClick={this.handleNewChild} >Add new child</button>
        <button onClick={this.handleDelete} >Remove </button>
        <input type="text" onChange={this.handleInput} defaultValue={this.state.value} value={this.state.value} ref="input" onKeyDown={this.handleKeyPress} />

        <ol>
          {children}
        </ol>
      </li>
    )
  }
}
