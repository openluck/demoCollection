// 描述
// 移除数组 arr 中的所有值与 item 相等的元素，直接在给定的 arr 数组上进行操作，并将结果返回
// 输入：[1, 2, 2, 3, 4, 2, 2], 2
// 输出：[1, 3, 4]
function removeWithoutCopy(arr, item) {
  while (arr.indexOf(item) !== -1) {
    arr.splice(arr.indexOf(item), 1);
  }
  return arr;
}