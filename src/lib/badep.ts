// chatgpt 说这叫“balancing deleting problem”，我在 google 上没搜到相关名称

/** 从 len 个元素的数组中，删除 to_d 个元素，这些被删除的元素是比较均匀地分布于数组中。
 */
export
function badep(len: number, to_d: number): number[] { // 这是一个 npm 上未注册的名字
  if (to_d <= 0) throw Error('to_d should be gte 0')
  if (!Number.isInteger(to_d)) throw Error('to_d should be an integer')
  if (len <= to_d) return []

  const result: number[] = []
  let i = 0
  while (true) {
    let step = Math.round(len / to_d)
    i += step // 被删除元素下表：步长对应的最后一个元素
    result.push(i - 1)

    to_d--
    len -= step
    if (len === 0)
      break
  }
  return result
}
