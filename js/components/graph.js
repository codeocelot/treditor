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
          value:'weed'
        }
      },
      showId:false,
      error:null
    }
    this.props.actions.create(null,'root!')
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
  render = () =>{
    return(
      <Paper>
        <label htmlFor='show-ids'>Show Ids</label>
        <input checked={this.state.showId} onChange={this.toggleIds} name="show-ids" type='checkbox'/>
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
