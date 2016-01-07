import React from 'react'
import FontAwesome from 'react-fontawesome'

export default class App extends React.Component{
  render(){
    return(
      <div className="app">

        <a className="fork-on-github" href="https://github.com/codeocelot/treditor"><img  src="https://camo.githubusercontent.com/82b228a3648bf44fc1163ef44c62fcc60081495e/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png"/></a>
        <div className="container-fluid body">
          {this.props.children}
        </div>
        <footer>
          <div className="container">
            <div className="made-by">
              <span>Made with &lt;3 in Vancouver  <FontAwesome name='tree'/></span>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}
