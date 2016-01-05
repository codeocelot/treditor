import React from 'react'
import ReactDOM from 'react-dom'
import Actions from '../actions/actions'
import Store from '../stores/store'
import Constants from '../constants/constants'
import keys from 'key_codes'

export default class Node extends React.Component{
  constructor(props){
    super(props);
    console.log(props)
    this.props = props;
    this.state = {
      value:'',
    }
  }
  componentDidMount = () => {
    this.setState({
      value:this.props.model.value
    });
    ReactDOM.findDOMNode(this.refs.input).focus();
    let ref_input = this.refs.input;
    Store.listen((type,payload)=>{
      switch(type){
        case 'UPDATE':
        break;
        case 'FOCUS':
        if(payload.model.id === this.props.model.id){
          // ReactDOM.findDOMNode(this.refs.input).focus();
          ReactDOM.findDOMNode(ref_input).focus();
        }
        break;
      }
    }).bind(this);
        Actions.refresh();
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
    if(evt.ctrlKey){
      switch(evt.keyCode){
        case keys.enter: // Enter
          Actions.create(this.props.model.id,'');
          break;
        case keys.left_arrow: // left Arrow
        case keys.j: // j
          Actions.refocus(Constants.LEFT,this.props.model.id);
          break;
        case keys.up_arrow: // up arrow
        case keys.l: // l
          Actions.refocus(Constants.UP,this.props.model.id);
          break;
        case keys.right_arrow: // right arrow
        case keys[';']: // ;
          Actions.refocus(Constants.RIGHT,this.props.model.id);
          break;
        case keys.down_arrow: // down arrow
        case keys.k: // k
          Actions.refocus(Constants.DOWN,this.props.model.id);
          break;
        case keys.delete:
        case keys.backspace:
        case keys.x:
          Actions.remove(this.props.model.id);
      }
      evt.preventDefault();

    }

  }

  render = () =>{
    var children = this.props.children?
      this.props.children.map(
        node=><Node
          key={node.model.id}
          {...node}
          showId={this.props.showId}
        />
      )
      : '';
    var id = this.props.showId? <span>ID: {this.props.model.id}</span> : '';
    return(
      <li>
        {id}

        {/*
        {(()=>{
          return this.props.parent?
          <button onClick={this.handleDelete} >Remove </button>
          :
          '';

        })()}
        */}
        <input type="text" onChange={this.handleInput} defaultValue={this.state.value} value={this.state.value} ref="input" onKeyDown={this.handleKeyPress} />

        <ol>
          {children}
        </ol>
      </li>
    )
  }
}
