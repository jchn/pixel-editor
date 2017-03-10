const getCoordsFromPixelIndex = (width, pixelIndex) => {
  const x = pixelIndex % width
  const y = Math.floor(pixelIndex / width)

  return [x, y]
}

export default getCoordsFromPixelIndex
