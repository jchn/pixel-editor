const getPixelIndex = (width, height, scale, x, y) => {
  const indexX = Math.floor(x / scale)
  const indexY = Math.floor(y / scale)

  return indexY * width + indexX
}

export default getPixelIndex
