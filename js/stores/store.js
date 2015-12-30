import Reflux from 'reflux'
import actions from '../actions/actions'
import _ from 'lodash'

// import _ from 'underscore'

export default Reflux.createStore({
  init(){
    this.root = null;
    this.nodes= [
      {k:'asdf',v:'content',c:[]}
    ]
    // {k:'asdf',v:'content',c:[
    //   {k:'qwer',v:'second',c:[]}
    // ]};
    this.listenToMany(actions);
    this.trigger(this.nodes);
    console.log(this.nodes)
  },
  onCreate(parentID){
    var node = {k:_.uniqueId(),v:'',c:[]}
    // node.key = _.uniqueId();
    var parent = _.find(this.nodes,n=>parentID === n.k);
    debugger;
    parent.c.push(node)
    this.nodes[node.key] = node;
    if( !this.root ) this.root = node;
    this.trigger(this.nodes);
  },
  onUpdate(node){
    var n = _.find(this.nodes,n=>n.k === node.k);

  }
})
