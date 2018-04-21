import React from 'react'
import injectSheet from 'react-jss'
import { global } from './css'
import * as scenes from './scenes'

@injectSheet(theme => ({
  '@global': global
}))
export default class App extends React.Component {
  state = {
    scene: 'game'
  }

  render() {
    const Component = scenes[this.state.scene]
    return <Component setState={(data) => this.setState(data)} />
  }
}
