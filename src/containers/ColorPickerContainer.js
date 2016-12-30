import React from 'react'
import ColorPicker from '../components/ColorPicker'
import { actions as colorActions } from '../redux/modules/colors'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    color: state.colors.currentColor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateColor: (color) => dispatch(colorActions.updateColor(color))
  }
}

const ColorPickerContainer = ({ color, updateColor }) => {
  return (
    <ColorPicker color={color} updateColor={updateColor} />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPickerContainer)
