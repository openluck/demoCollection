// 描述
// 统计数组 arr 中值等于 item 的元素出现的次数
// 示例1
// 输入：
// [1, 2, 4, 4, 3, 4, 3], 4
// 输出：
// 3
function count(arr, item) {
  let index = 0;
  arr.map(item1 => {
    if (item1 === item) {
      index += 1
    }
  })
  return index
}

function count(arr, item) {
  var count = 0;
  arr.forEach(function (e) {
    //e为arr中的每一个元素，与item相等则count+1
    e == item ? count++ : 0;
  });
  return count;
}

//filter()-->利用指定的函数确定是否在返回的数组中包含某一项
function count(arr, item) {
  var count = arr.filter(function (a) {
    return a === item;   //返回true的项组成的数组
  });
  return count.length;
}
//map()-->对数组中的每一项进行给定函数，
//返回每次函数条用的结果组成的数组；
function count(arr, item) {
  var count = 0;
  arr.map(function (a) {
    if (a === item) {
      count++;
    }
  });
  return count;
}
//for循环
function count(arr, item) {
  var count = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      count++;
    }
  }
  return count;
}
//reduce()-->从数组的第一项开始，逐个遍历到最后；
function count(arr, item) {
  var count = arr.reduce(function (prev, curr) {
    return curr === item ? prev + 1 : prev;
  }, 0);
  return count;
}
//forEach()-->对数组中的每一项运行传入的函数
function count(arr, item) {
  var count = 0;
  arr.forEach(function (a) {
    a === item ? count++ : 0;
  });
  return count;
}