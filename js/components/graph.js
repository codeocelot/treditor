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
          id:1,
          value:''
        }
      }
    }
    Actions.refresh();
  }
  componentDidMount = () => {
    Store.listen((type,payload)=>{
      switch(type){
        case Constants.UPDATE:
        this.setState({nodes:payload})
        break;
      }

    })
  }
  render = () =>{
    // let root = this.state.nodes.root;
    // this.state.key = "root"
    return(
      <div>
      <h1>A graph component</h1>
      <ol>
            <Node key={this.state.nodes.model.id} {...this.state.nodes} />
      </ol>

      </div>
    )
  }
}

// Graph.propTypes = {
//   node:React.PropTypes.Object,
//   children:React.PropTypes.Array
// }
