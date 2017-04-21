import React, { PropTypes } from 'react'

const icons = {
  colorize: 'M20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-3.12 3.12-1.93-1.91-1.41 1.41 1.42 1.42L3 16.25V21h4.75l8.92-8.92 1.42 1.42 1.41-1.41-1.92-1.92 3.12-3.12c.4-.4.4-1.03.01-1.42zM6.92 19L5 17.08l8.06-8.06 1.92 1.92L6.92 19z',
  pen: 'M0 14.25V18h3.75L14.81 6.94l-3.75-3.75L0 14.25zM17.71 4.04c.39-.39.39-1.02 0-1.41L15.37.29c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  ellipse: 'M9.99 0C4.47 0 0 4.48 0 10s4.47 10 9.99 10C15.52 20 20 15.52 20 10S15.52 0 9.99 0zM10 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z',
  rectangle: 'M12 18h2v-2h-2v2zm4 0h2v-2h-2v2zM4 18h2v-2H4v2zm4 0h2v-2H8v2zm8-4h2v-2h-2v2zm0-4h2V8h-2v2zM0 0v18h2V2h16V0H0zm16 6h2V4h-2v2z',
  fill: 'M15.065 9.933L5.133 0 3.566 1.567 6.21 4.21.49 9.934c-.656.656-.656 1.71 0 2.356L6.6 18.4c.322.322.755.49 1.177.49.422 0 .855-.168 1.178-.49l6.11-6.11c.655-.646.655-1.7 0-2.357zM2.455 11.11l5.322-5.32 5.32 5.32H2.457zm15.32 1.668s-2.22 2.41-2.22 3.89c0 1.22 1 2.22 2.22 2.22 1.223 0 2.223-1 2.223-2.22 0-1.48-2.222-3.89-2.222-3.89z',
  line: 'M2.27 1L1 2.27 15.73 17 17 15.73 2.55 1.27z',
  add: 'M14 8H8v6H6V8H0V6h6V0h2v6h6',
  eye: 'M11 .5C6 .5 1.73 3.61 0 8c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C20.27 3.61 16 .5 11 .5zM11 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8C9.34 5 8 6.34 8 8s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
  play: 'M0 0v14l11-7',
  pause: 'M0 14h4V0H0v14zM8 0v14h4V0H8z'

}

const Icon = ({ width, height, type, color, ...props }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20" {...props}>
      <path fill={color} d={icons[type]}></path>
    </svg>
  )
}

Icon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  type: PropTypes.string.isRequired,
  color: PropTypes.string
}

Icon.defaultProps = {
  width: 20,
  height: 20,
  color: 'white'
}

export default Icon
