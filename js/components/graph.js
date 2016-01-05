import React from 'react'
import Node from './node'
import _ from 'lodash'
import Constants from '../constants/constants'
import Paper from 'material-ui/lib/paper'

export default class Graph extends React.Component{
  constructor(props){
    super(props);
    this.state = {nodes:
      {model:
        {
          id:_.uniqueId(),
          value:''
        }
      },
      showId:false,
      showHelp:false,
      error:null
    }
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
  toJSON = () => {
    function json(children){
      let d = children.map(c=> {return {id: c.model.id,  model: c.model }});
      debugger;
    }
    json(this.props.children)
  }
  helpText = () => {
    function kbd(txt){return(<span className="kbd">{txt}</span>)}
    return(
      <section>
        <p>
          Create nodes with {kbd('ctrl')} + {kbd('j')},{kbd('k')},{kbd('l')},{kbd(';')}
        </p>
      </section>
    )
  }
  render = () =>{

    // let helpText = this.state.showHelp ? 'Control with ctrl + {j,k,l,;}.  Like vim except shifted right one key' : ''
    return(
      <Paper>
        <div>
          <label htmlFor='show-help'>Show Help</label>
          <button onClick={this.toggleHelp} type="button">Show Help</button>
          {this.state.showHelp ? this.helpText() : ''}
        </div>
        <div>
          <label htmlFor='show-ids'>Show Ids</label>
          <input checked={this.state.showId} onChange={this.toggleIds} name="show-ids" type='checkbox'/>
        </div>
        <ol>
          <Node key={this.state.nodes.model.id} {...this.state.nodes} showId={this.state.showId}/>
        </ol>
      </Paper>
    )
  }
}

Graph.propTypes = {
  store : React.PropTypes.object,
  actions : React.PropTypes.object
  // node:React.PropTypes.Object,
  // children:React.PropTypes.Array
}
