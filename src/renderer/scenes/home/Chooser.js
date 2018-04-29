import React from 'react'
import injectSheet from 'react-jss'

@injectSheet(theme => ({
  outer: {
    background: theme.color.foreground,
    ...theme.border.standard,
  }
}))
export default class Chooser extends React.Component {
  render() {
    const classes = this.props.classes
    return (
      <div className={classes.outer}>
        {this.props.children}
        <div className={classes.divider} />
        {this.props.history?.map(robot =>
          <p key={robot.name} onClick={() =>
            this.props.setGlobalState({
              scene: 'game',
              robot,
            })
          }>{robot.name}</p>
        )}
      </div>
    )
  }
}
