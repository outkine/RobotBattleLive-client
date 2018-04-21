import React from 'react'
import injectSheet from 'react-jss'

@injectSheet({
  outer: {
    display: 'flex',
    overflowX: 'auto',
    userSelect: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    }
  }
})
export default class HorizontalScroll extends React.Component {
  state = {
    grabbing: false
  }

  render() {
    return (
      <div
        onMouseMove={this.onMouseMove}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.reset}
        onMouseUp={this.reset}
        style={{ cursor: this.state.grabbing ? '-webkit-grabbing' : 'pointer' }}
        ref={el => this.el = el}
        className={this.props.classes.outer + ' ' + this.props.className}
      >
        {this.props.array.map(item =>
          React.cloneElement(this.props.render(item), {
            onClick: e => this.onClick(e, item)
          })
        )}
      </div>
    )
  }

  onMouseMove = (e) => {
    this.cursorMoved = true
    if (this.cursorDown) {
      this.setState({ grabbing: true })
      this.el.scrollLeft = this.elScroll + (this.cursorX - e.pageX)
    }
  }

  onMouseDown = (e) => {
    this.cursorMoved = false
    this.cursorDown = true
    this.cursorX = e.pageX
    this.elScroll = this.el.scrollLeft
    this.timeout = setTimeout(() => {
      this.setState({ grabbing: true })
    }, 300)
  }

  reset = () => {
    this.setState({ grabbing: false })
    this.cursorDown = false
    clearTimeout(this.timeout)
  }

  onClick = (e, item) => {
    if (!this.cursorMoved) {
      e.stopPropagation()
      this.props.onClick(item)
    }
  }
}
