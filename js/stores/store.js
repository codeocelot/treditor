'use strict'
import Reflux from 'reflux'
import Actions from '../actions/actions'
import Constants from '../constants/constants'
import _ from 'lodash'
import TreeModel from 'tree-model'
let tree = new TreeModel();

// let TreeModel = Object.assign({},_TreeModel);
// debugger;
// TreeModel.prototype.stringify = () => {
//   debugger;
// }
//
// let tree = new TreeModel();
//
// tree.stringify = () => {
//   debugger;
// }

export default Reflux.createStore({
  init(){

    // this.root = localStorage.root || tree.parse({id:_.uniqueId(),value:''});
    if(localStorage.root && localStorage.root != '' && typeof localStorage.root === 'object'){
      this.root = localStorage.root;
      // var ls = JSON.parse(localStorage.root);
      // this.root = tree.parse({id:ls.model.id});
      // this.root.model = ls.model;
      // this.root.children = ls.children;
    } else {
      this.root = tree.parse({id:_.uniqueId(),value:''});
      // debugger;
      // this.root.stringify();
    }
    this.listenToMany(Actions);
    this.trigger(Constants.UPDATE,this.root);
  },

  onCreate(parentID,value){
    if(!parentID || !this.root){
      this.root = tree.parse({id:_.uniqueId(),value:''})
    } else {
      var parent = this.root.first(n=>n.model.id === parentID);
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
    // debugger;
    // localStorage.root = JSON.stringify(this.root);
    localStorage.setItem('root',this.root)
    this.trigger(Constants.UPDATE,this.root)
  },

  onRemove(id){
    var n = this.root.first(n=>n.model.id === id);
    var parent = getParent(n);
    if(!parent){
      this.root = tree.parse({id:_.uniqueId(),value:''})
    }else{
      var newIndex = Math.max(n.getIndex()-1,0)
      n.drop();
      if(parent.hasChildren()){
        Actions.refocus(null,parent.children[newIndex].model.id)
      }
      else{
        Actions.refocus(null,parent.model.id);
      }
    }
    this.trigger(Constants.UPDATE,this.root);
  },

  createParent(id){
    var p = tree.parse({id:_.uniqueId()});
    p.addChild(this.root);
    this.root = p;
    this.trigger(Constants.UPDATE,this.root);
  },

  onRefocus(dir,id){
    let node = this.root.first(n=>n.model.id === id );
    let target = node;
    switch(dir){
      case Constants.LEFT:
        var path = node.getPath();
        switch(path.length){
          case 1:
          this.createParent();
          target = this.root;
          break;
          case 2:
          default:
          var parent = node.getPath();
          target = parent[parent.length-2];
          break;
        }
        break;
      case Constants.RIGHT:
        var child = node.children[0];
        if(!child)
        Actions.create(id,'')
        else target = child;
        break;
      case Constants.DOWN:
        if(node.isRoot())
        return this.trigger(Constants.ERROR,new Error('Cannot create sibling of root node'))

        var parents = node.getPath();
        var siblings = parents[parents.length - 2 ].children;
        if(node.getIndex() < siblings.length - 1 ){
          target = siblings[node.getIndex() + 1 ]
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
      case null:
        break;
    }
    this.trigger(Constants.FOCUS,target)
  }

})

function getParent(node){
  var parents = node.getPath();
  return parents[parents.length-2];
}
