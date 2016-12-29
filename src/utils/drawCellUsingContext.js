const drawCellUsingContext = (ctx, scale, row, col, color) => {
  ctx.fillStyle = color
  const cellSize = scale
  ctx.fillRect(row * cellSize, col * cellSize, cellSize, cellSize)
  return ctx
}

export default drawCellUsingContext
