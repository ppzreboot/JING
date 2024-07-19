import { resize_img, download_png } from '@czuo/jing'
import './global.css'

declare global {
  interface Window {
    open_img(): void
    cut(): void
    preview(): void
  }
}

const source_img = () => document.getElementById('source') as HTMLImageElement
const input = (name: string) => document.querySelector(`input[name=${name}]`) as HTMLInputElement

let size: null | { width: number, height: number } = null

window.open_img = async () => {
  const img_file = await new Promise<File>(res => {
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = () => {
      res(input.files![0])
    }
    input.click()
  })
  const si = source_img()
  si.src = URL.createObjectURL(img_file)
  await new Promise(res => si.onload = res)

  const width = si.width
  const height = si.height
  size = { width, height }
  document.getElementById('raw-size')!.innerHTML = `width: ${width}; height: ${height};`
  input('width').value = width + ''
  input('height').value = height + ''
}

window.cut = () => {
  if (!size) {
    console.warn('cut before open img')
    // window.open_img() // open 后，loaded 前的时间，不好判断
    return
  }

  download_png(
    resize_img({
      img: source_img(),
      width: Number(input('width').value),
      height: Number(input('height').value),
    })
  )
}

window.preview = () => {
  if (!size) {
    console.warn('cut before open img')
    return
  }

  // @ts-ignore
  document.getElementById('preview').src =
    resize_img({
      img: source_img(),
      width: Number(input('width').value),
      height: Number(input('height').value),
    }).toDataURL()
}