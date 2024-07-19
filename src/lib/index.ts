import { badep } from 'badep'

interface Props {
  /** 目标图片 */
  img: HTMLImageElement // url 和 File 都会导致异步（img.onload）
  /** 处理后的宽度 */
  width?: number
  /** 处理后的高度 */
  height?: number
}

/** 抽出图片多余的像素 */
export
function resize_img(props: Props) {
  props.width ??= props.img.width
  props.height ??= props.img.height

  const canvas = document.createElement('canvas')
  canvas.width = props.img.width
  canvas.height = props.img.height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(props.img, 0, 0)
  const img_data = ctx.getImageData(0, 0, props.img.width, props.img.height)
  const new_img_data = resize_img_data(img_data, props.width, props.height)

  const new_canvas = document.createElement('canvas')
  new_canvas.width = props.width
  new_canvas.height = props.height
  const new_ctx = new_canvas.getContext('2d')!
  new_ctx.putImageData(new_img_data, 0, 0)
  return new_canvas
}

export
function to_img(canvas: HTMLCanvasElement) {
  const img = new Image()
  img.src = canvas.toDataURL()
  return img
}

/** 把 canvas 转成 data url，再下载到本地 */
export
function download_png(canvas: HTMLCanvasElement) {
  const a = document.createElement('a')
  a.href = canvas.toDataURL()
  a.download = new Date().getTime() + '.resized.png'
  a.click()
}

/** 抽像素的底层方法 */
export
function resize_img_data(img_data: ImageData, width: number, height: number) {
  if (!width || !height)
    throw Error('invalid type of size')
  if (width < 1 || height < 1)
    throw Error('size less than 0')
  if (width > img_data.width || height > img_data.height)
    throw Error('size greater than raw')

  // x 方向，要删除的元素（下标）
  const to_d_x = badep(img_data.width, img_data.width - width)
  // y 方向，要删除的元素（下标）
  const to_d_y = badep(img_data.height, img_data.height - height)

  // console.debug({ to_d_x, to_d_y })
  const row_width = img_data.width * 4
  const new_data = img_data.data.filter(
    (_, index) => {
      const x = Math.floor(index % row_width / 4) // 求横坐标
      const y = Math.floor(index / row_width) // 求纵坐标
      // console.debug({ x, y })
      return !(to_d_x.includes(x) || to_d_y.includes(y))
    }
  )
  return new ImageData(new_data, width, height)
}
