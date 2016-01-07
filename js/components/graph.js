import React from 'react'
import Node from './node'
import _ from 'lodash'
import Constants from '../constants/constants'
import Paper from 'material-ui/lib/paper'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'

export default class Graph extends React.Component{
  constructor(props){
    super(props);
    this.state = {nodes:
      {
        model:
        {
          id:_.uniqueId(),
          value:'pen15'
        },
      },
      showId:false,
      showHelp:false,
      error:null,
      json:'',
    }
    this.props.actions.create(null,'')
    // this.props.actions.create(null,'root!')
    // this.props.actions.refresh();
  }
  componentDidMount = () => {
    this.props.store.listen((type,payload)=>{
      switch(type){
        case Constants.UPDATE:
        this.setState({nodes:payload})
        break;
        case Constants.ERROR:
        this.setState({error:payload})
        break;
      }
    })
  }
  toggleIds = () => {
    this.setState({showId:!this.state.showId})
  }
  toggleHelp = () => {
    this.setState({showHelp:!this.state.showHelp})
  }
  // toJSON = () => {
  //   return this.
  //   // function json(children){
  //   //   let d = children.map(c=> {return {id: c.model.id,  model: c.model }});
  //   // }
  //   // debugger;
  //   // let node = this.state.nodes;
  //   // let obj = Object.assign({},node.model)
  //   //
  //   // while(node.children){
  //   //   childs = node.children.map(c=>)
  //   // }
  // }
  helpText = () => {
    function kbd(txt){return(<span className="kbd">{txt}</span>)}
    return(
      <section>
        <p>
          Navigate the tree with {kbd('ctrl')} + {kbd('j')},{kbd('k')},{kbd('l')},{kbd(';')}  or
          {kbd('←')},{kbd('↓')},{kbd('↑')},{kbd('→')}.  Vim style but shifted one key to the right.
        </p>
        <p>
          Delete elements with {kbd('ctrl')} + {kbd('x')},{kbd('del')} or {kbd('enter')}
        </p>
        <div >
          <label htmlFor='show-ids'>Show Ids</label>
          <input checked={this.state.showId} onChange={this.toggleIds} name="show-ids" type='checkbox'/>
        </div>
      </section>
    )
  }
  toJSON = () => {
    // var node = Object.assign({},this.state.nodes);
    var node = _.clone(this.state.nodes,true);
    function fmt(node){
      delete node.id;
      if(!node.value){
        node.value = "";
      }
      if(node.children){
        node.children = node.children.map(n=>fmt(n));
      }
      return node;
    }
    node.model = fmt(node.model);
    return JSON.stringify(node.model,null,2);
  }
  render = () =>{
    let elementStyle = {padding:'10px'}
    let headingStyle = {}
    // let helpText = this.state.showHelp ? 'Control with ctrl + {j,k,l,;}.  Like vim except shifted right one key' : ''
    return(
      <div className='paper' style={{padding:'75px'}}>
        <div style={headingStyle}>
          <h1>Treditor</h1>
        </div>
        <div style={elementStyle}>
          <button onClick={this.toggleHelp} type="button">Show Help</button>
          {this.state.showHelp ? this.helpText() : ''}
        </div>
        {/*<button type="button" onClick={this.toJSON}>To json</button>*/}

        <div className="container-fluid">
        <section className="six columns">
        <ol>
          <Node key={this.state.nodes.model.id} {...this.state.nodes} showId={this.state.showId}/>
        </ol>
        </section>

        <section className="six columns">
          <TextField className='json-output' fullWidth={true} value={this.toJSON()} multiLine={true}/>
        </section>
        </div>
      </div>
    )
  }
}

Graph.propTypes = {
  store : React.PropTypes.object,
  actions : React.PropTypes.object
}
