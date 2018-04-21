import React from 'react'
import injectSheet from 'react-jss'

import HorizontalScroll from './HorizontalScroll'

@injectSheet(theme => ({
  outer: {
    padding: [20, 0],
    background: theme.color.foreground,
    boxShadow: theme.shadow.ui,
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

      </div>
    )
  }

  onClick = (i) => {
    this.setState({ currentTurn: i })
  }
}
