const getCoordsFromPixelIndex = (width, pixelIndex) => {

  const x = pixelIndex % width
  const y = Math.floor(pixelIndex / width)

  console.log('width', width)
  console.log('pixelIndex', pixelIndex)

  return [x, y]
}

export default getCoordsFromPixelIndex
