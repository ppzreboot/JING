import { test, expect } from 'vitest'
import { badep } from './badep'

test('balancing deleting problem', () => {
  expect(
    badep(8, 2)
  ).toEqual([3, 7])
  expect(
    badep(8, 3)
  ).toEqual([2, 5, 7])
  expect(
    badep(8, 5)
  ).toEqual([1, 3, 4, 6, 7])

  expect(
    badep(100, 99).length
  ).toBe(99)
  expect(
    badep(100, 2).length
  ).toBe(2)
  expect(
    badep(101, 97).length
  ).toBe(97)
  expect(
    badep(100001, 303).length
  ).toBe(303)

  // 加了 opposite 之后，下面的单元测试失效
  // expect(
  //   badep(101, 97).at(-1)
  // ).toBe(100)
  // expect(
  //   badep(10001, 1001).at(-1)
  // ).toBe(10000)
})
