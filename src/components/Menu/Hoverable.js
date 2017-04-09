import React, { Component, PropTypes } from 'react'
import Pointable from '../Pointable'

class Hoverable extends Component {
  constructor (props) {
    super(props)
    this.state = { isHovering: false }
  }

  updateHoverState = (isHovering) => e => {
    this.setState({
      isHovering
    })
  }

  render () {
    const renderedChildren = this.props.children(this.state.isHovering)
    return (
      <Pointable
        onPointerMove={this.updateHoverState(true)}
        onPointerEnter={this.updateHoverState(true)}
        onPointerLeave={this.updateHoverState(false)}
        onPointerCancel={this.updateHoverState(false)}
      >
        {renderedChildren}
      </Pointable>
    )
  }
}

export default Hoverable

export const iiHoverable = (propName) => {
  return (WrappedComponent) => {
    return ({ ...props }) => (
      <Hoverable>
        {isHovering => (
          <WrappedComponent {...props} {...{[propName]: isHovering}} />
        )}
      </Hoverable>
    )
  }
}
