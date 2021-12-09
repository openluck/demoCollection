// 描述
// 找出数组 arr 中重复出现过的元素（不用考虑返回顺序）
// 示例1
// 输入：
// [1, 2, 4, 4, 3, 3, 1, 5, 3]
// 输出：
// [1, 3, 4]
// 个人解题思路：双重for循环，并且返回的数组，单个数组去重
function duplicates(arr) {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !newArr.includes(arr[i]))
        // if (!newArr.includes(arr[i])) {
        newArr.push(arr[i])
      // }
    }
  }
  return newArr
}

// 直接用一个filter，比较从前往后第一个匹配到的index是否等于从后往前匹配到的第一个index即可。然后再去重。。不用排序的
function duplicates(arr) {
  return arr.filter(function (item, index, array) {
    return array.indexOf(item) !== array.lastIndexOf(item) && array.indexOf(item) === index;
  })
}

/* 时间复杂度为O(n)算法。
思路:遍历数组，将数组的元素和数组出现的次数分别作为对象属性和值。遍历对象，取出
次数大于1的即可。 */
function duplicates(arr) {
  var obj = {};
  var repeatList = [];
  //遍历数组，将数组的值作为obj的索引，出现次数为值
  arr.forEach(function(item){
      if(obj[item]){
          obj[item] +=1;
      }else{
          obj[item] = 1;
      }
  });
  //获取对象自身属性
  var propertyNames = Object.getOwnPropertyNames(obj);
  //遍历对象，将重复出现的元素取出
  propertyNames.forEach(function(item){
      if(obj[item] > 1){
          repeatList.push(parseInt(item));
      }
  });
  return repeatList; 
}
