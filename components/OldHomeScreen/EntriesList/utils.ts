export const getBatchedBoxes = <T>(array: T[]) => {
  const SIZE = 5
  const batchedArray = []

  for (let i = 0; i < array.length; i += SIZE) {
    batchedArray.push(array.slice(i, i + SIZE))
  }
  return batchedArray
}
