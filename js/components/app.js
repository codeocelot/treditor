import React from 'react'
import FontAwesome from 'react-fontawesome'

export default class App extends React.Component{
  render(){
    return(
      <div className="app">
        <div className="container">
          {this.props.children}
        </div>
        <footer>
          <div className="container">
            <div className="made-by">
              <span>Made with &lt;3 in Vancouver.<FontAwesome name='tree'/></span>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}
