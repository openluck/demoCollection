// 描述
// 为数组 arr 中的每个元素求二次方。不要直接修改数组 arr，结果返回新的数组
// 示例1
// 输入：
// [1, 2, 3, 4]
// 输出：
// [1, 4, 9, 16]  
function square(arr) {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * arr[i]
    newArr.push(arr[i])
  }
  return newArr
}

function square(arr) {
  return arr.map(function(item,index,array){
      return item*item;
  })
}

function square(arr) {
  //声明一个新的数组存放结果
    var a = [];
    arr.forEach(function(e){
        //将arr中的每一个元素求平方后，加入到a数组中
        a.push(e*e);
    });
    return a;
}