import React from 'react'
import injectSheet from 'react-jss'
import { global } from './css'
import * as scenes from './scenes'

@injectSheet(theme => ({
  '@global': global
}))
export default class App extends React.Component {
  state = {
    scene: 'home',
    files: [__static + 'robot'],
  }

  render() {
    let props = {}
    switch (this.state.scene) {
      case 'game': {
        props = { files: this.state.files }
        break
      }
    }
    const Component = scenes[this.state.scene]
    return <Component {...props} setState={(data) => this.setState(data)} />
  }
}
