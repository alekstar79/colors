class Colors
{
  constructor(cols)
  {
    this.cols = cols
    this.setRandomColors(true)
  }

  setRandomColors(isInitial)
  {
    const colors = isInitial ? this.getColorsFromHash() : []

    this.cols.forEach((col, index) => {
      const isLocked = col.querySelector('i').classList.contains('fa-lock')
      const button = col.querySelector('button')
      const text = col.querySelector('h2')

      if (isLocked) {
        colors.push(text.textContent)
        return
      }

      const color = isInitial
        ? colors[index]
          ? colors[index]
          : chroma.random()
        : chroma.random()

      if (!isInitial) {
        colors.push(color)
      }

      text.textContent = color
      col.style.background = color

      this.setTextColor(text, color)
      this.setTextColor(button, color)
    })

    this.updateColorsHash(colors)
  }

  setTextColor(text, color)
  {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > .5 ? 'black' : 'white'
  }

  updateColorsHash(colors = [])
  {
    document.location.hash = colors
      .map((col) => {
        return col.toString().substring(1)
      })
      .join('-')
  }

  getColorsFromHash()
  {
    if (document.location.hash.length > 1) {
      return document.location.hash
        .substring(1)
        .split('-')
        .map((color) => '#' + color)
    }

    return []
  }

  copyToClipboard(text)
  {
    navigator.clipboard.writeText(text).catch(console.log)
  }
}

const colors = new Colors(document.querySelectorAll('.col'))

document.addEventListener('keydown', (event) => {
  event.preventDefault()

  if (event.code.toLowerCase() === 'space') {
    colors.setRandomColors()
  }
})

document.addEventListener('click', ({ target }) => {
  const type = target.dataset.type

  switch (type) {
    case 'lock':
      const node = target.tagName.toLowerCase() === 'i' ? target : target.children[0]
      node.classList.toggle('fa-lock-open')
      node.classList.toggle('fa-lock')
      break

      case 'copy':
      colors.copyToClipboard(target.textContent)
      break
  }
})
