import React from 'react'
import injectSheet from 'react-jss'

import HorizontalScroll from './HorizontalScroll'
import Grid from './Grid'
import Bot from './runner/Bot'
import main from './runner'

@injectSheet(theme => ({
  outer: {
  },
  bar: {
    display: 'flex',
    padding: [20, 10],
    background: theme.color.foreground,
    boxShadow: theme.shadow.ui,
    '& button': {
      userSelect: 'none',
      background: 'none',
    }
  },
  timeline: {
    fontSize: 30,
    width: '80%',
    margin: 'auto',
    background: theme.color.foregroundDark,
    padding: [0, 20],
    boxShadow: theme.shadow.inset,

    '& > *': {
      padding: [10, 15],
      color: theme.color.background,
    }
  },
  currentTurn: {
    background: theme.color.foregroundLight,
    boxShadow: theme.shadow.s1,
  },
}))
export default class Game extends React.Component {
  state = {
    currentTurn: 1,
    totalTurns: 40,
  }

  render() {
    const classes = this.props.classes

    return (
      <div className={classes.outer}>
        <div className={classes.bar}>
          <button onClick={() => this.props.setState({ scene: 'home' })}>
            <img src={require(__static + '/home.svg')} />
          </button>
          <HorizontalScroll
            className={classes.timeline}
            onClick={this.onClick}
            array={[...Array(this.state.totalTurns).keys()]}
            render={i =>
              <div
                className={
                  i === this.state.currentTurn
                    ? classes.currentTurn
                    : classes.turn
                }
                key={i}
              >
                {i}
              </div>
            }
          />
          <button onClick={this.play}>
            <img src={require(__static + '/play.svg')} />
          </button>
        </div>
        <Grid />
      </div>
    )
  }

  onClick = (i) => {
    this.setState({ currentTurn: i })
  }

  play = () => {
    console.log(main(this.props.files.map(file =>
      new Bot('python', file, )
    )))
  }
}
