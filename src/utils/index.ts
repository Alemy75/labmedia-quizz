const Utils = {
  shuffleArray(array: any[]) {
    return array.sort(() => Math.random() - 0.5)
  },
}

export default Utils
