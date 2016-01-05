import React from 'react'
import Node from './node'
import _ from 'lodash'
import Store from '../stores/store.js'
import Actions from '../actions/actions'
import Constants from '../constants/constants'

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
      error:null
    }
    Actions.refresh();
  }
  componentDidMount = () => {

    Store.listen((type,payload)=>{
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
    // let root = this.state.nodes.root;
    // this.state.key = "root"
    return(
      <div>
        <label htmlFor='show-ids'>Show Ids</label>
        <input checked={this.state.showId} onChange={this.toggleIds} name="show-ids" type='checkbox'/>
      <ol>
            <Node key={this.state.nodes.model.id} {...this.state.nodes} showId={this.state.showId}/>
      </ol>

      </div>
    )
  }
}

// Graph.propTypes = {
//   node:React.PropTypes.Object,
//   children:React.PropTypes.Array
// }
