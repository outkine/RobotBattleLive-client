import React from 'react'
import injectSheet from 'react-jss'
import { remote } from 'electron'
import path from 'path'

import store from '../../../store'

@injectSheet(theme => ({
  outer: {
    background: theme.color.foreground,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    fontSize: 30,
  },
  seperator: {
    width: 2,
    height: 200,
    margin: [0, 30],
    background: theme.color.background,
  },
  openFile: {
    flexBasis: '50%',
    '& button': {
      fontSize: 30,
      marginLeft: 'auto',
      display: 'block',
      background: theme.color.background,
      boxShadow: theme.shadow.action,
      padding: 7,
    }
  },
  fileList: {
    flexBasis: '50%',
    color: theme.color.background,
  },
  fileListTitle: {
    fontWeight: 'bold',
  }
}))
export default class Home extends React.Component {
  render() {
    const classes = this.props.classes
    return (
      <div className={classes.outer}>
        <div className={classes.openFile}>
          <button onClick={this.openFile}>open file</button>
        </div>
        <div className={classes.seperator} />
        <div className={classes.fileList}>
          <p className={classes.fileListTitle}>recent files</p>
          {store.get('files')?.map(fileName =>
            <p key={fileName}>{fileName}</p>
          )}
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
