import React from 'react'
import injectSheet from 'react-jss'
import { remote } from 'electron'
import path from 'path'

import Chooser from './Chooser'
import store from 'common/store'

@injectSheet(theme => ({
  outer: {
    '& p': {
      fontWeight: 900,
      fontSize: 40,
    },
    margin: 100,
  },
  matchup: {
    marginBottom: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& button': {
      width: 175,
      height: 50,
    },
    '& > *': {
      margin: [0, 20],
    }
  },
  team1: {
    background: theme.color.primary1,
    ...theme.border.standard,
  },
  team2: {
    background: theme.color.primary2,
    ...theme.border.standard,
  },
  chooser: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: [0, 20],
      padding: 20,
      width: '40%',
      maxWidth: 500,
    }
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  robotSearch: {
    ...theme.border.standard,
    height: 60,
    position: 'relative',
    display: 'flex',
    padding: [0, 7],
    '& input': {
      marginLeft: 10,
      height: '100%',
      fontSize: 34,
      background: 'none',
      fontFamily: 'Nunito',
      width: '100%',
    }
  },
  addRobot: {
    width: 120,
    height: 60,
    ...theme.border.standard,
  }
}))
export default class Home extends React.Component {
  state = {
    search: '',
    currentTeam: 0,
  }

  render() {
    const classes = this.props.classes
    return (
      <div className={classes.outer}>
        <div className={classes.matchup}>
          <button className={classes.team1}>
          </button>
          <p>vs</p>
          <button className={classes.team2}>
          </button>
        </div>
        <div className={classes.chooser}>
          <Chooser
            history={store.get('history')}
            setGlobalState={this.props.setGlobalState}
          >
            <div className={classes.header}>
              <img src={require(__static + '/user.svg')} />
              <p>your robots</p>
            </div>
            <button className={classes.addRobot} style={{
              background: this.props.theme.color.teamColors[this.state.currentTeam],
            }}>
              <img src={require(__static + '/plus.svg')} />
            </button>
          </Chooser>
          <Chooser
            setGlobalState={this.setGlobalState}
          >
            <div className={classes.header}>
              <img src={require(__static + '/cloud.svg')} />
              <p>online robots</p>
            </div>
            <div className={classes.robotSearch} style={{
              background: this.props.theme.color.teamColors[this.state.currentTeam],
            }}>
              <img src={require(__static + '/search.svg')} />
              <input onChange={event => this.setState({ search: event.target.value })} />
            </div>
          </Chooser>
        </div>
      </div>
    )
  }

  openFile = () => {
    const files = remote.dialog.showOpenDialog()
    store.set('files', [...new Set(files)].map(filePath => path.basename(filePath)))
    this.props.setState({ scene: 'game', file: files[0] })
  }
}
