const rotateLeft = (arr) => {
  if (arr.length > 0) {
    const firstElement = arr.shift()
    arr.push(firstElement)
  }
  return arr
}

export default rotateLeft
