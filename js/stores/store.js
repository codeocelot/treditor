'use strict'
import Reflux from 'reflux'
import Actions from '../actions/actions'
import Constants from '../constants/constants'
import _ from 'lodash'
import TreeModel from 'tree-model'
let tree = new TreeModel();

// import _ from 'underscore'

export default Reflux.createStore({
  init(){
    this.root = tree.parse({id:_.uniqueId(),value:'root!'});
    this.listenToMany(Actions);
    this.trigger(Constants.UPDATE,this.nodes);
  },

  onCreate(parentID,value){
    if(!parentID || !this.root){
      this.root = tree.parse({id:_.uniqueId(),value:''})
    } else {
      var parent = this.root.first(n=>n.model.id === parentID);
      console.log(parent)
      var node = tree.parse({id:_.uniqueId()})
      parent.addChild(node);
    }

    this.trigger(Constants.UPDATE,this.root)
  },

  onRefresh(){
    this.trigger(Constants.UPDATE,this.root);
  },

  onUpdate(id,val){
    var n = this.root.first(n=>n.model.id === id);
    n.model.value = val;
    this.trigger(Constants.UPDATE,this.root)
  },

  onRemove(id){
      var n = this.root.first(n=>n.model.id === id);
      n.drop();
      this.trigger(Constants.UPDATE,this.root);
  },

  onRefocus(dir,id){
    let node = this.root.first(n=>n.model.id === id );
    let target = node;
    switch(dir){
      case Constants.LEFT:
        var parent = node.getPath();
        target = parent[parent.length-2];
        // this.trigger(Constants.FOCUS,parent[parent.length-2].model);
        break;
      case Constants.RIGHT:
        var child = node.children[0];

        if(!child){
          Actions.create(id,'')
        }
        else target = child;
        // this.trigger(Constants.FOCUS,child.model)
      break;
      case Constants.DOWN:
        var parents = node.getPath();
        var siblings = parents[parents.length-2].children;

        if(node.getIndex() < siblings.length - 1 ){
          target = siblings[node.getIndex() + 1]
        } else {
          Actions.create(parents[parents.length-2].model.id,'')
        }
        break;
      case Constants.UP:
        var parents = node.getPath();
        var siblings = parents[parents.length-2].children;
        if(node.getIndex() > 0)
          target = siblings[node.getIndex()-1]

        break;
    }
    this.trigger(Constants.FOCUS,target)

  }

})
