/*
 * @Descripttion: 
 * @version: 
 * @Author: OpenLcuk
 * @Date: 2021-11-29 16:35:49
 * @LastEditors: OpenLcuk
 * @LastEditTime: 2021-12-09 15:35:32
 */
// https://segmentfault.com/a/1190000020044236
// 题目描述
// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

// 示例
// 给定 nums = [2, 7, 11, 15], target = 9
// const nums = [2, 7, 11, 15], target = 9;
const nums = [0, 9, 11, 15], target = 9;
// 因为 nums[0] + nums[1] = 2 + 7 = 9  sada
// 所以返回 [0, 1]


// 方法一
// 这题不难，遍历nums，用targer减去当前元素，得到的元素如果在数组中，那就完事了。不过要注意统一元素不能用两次
// indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
// 如果没有找到匹配的字符串则返回 -1。
// var twoSum = function (nums, target) {
//   let idx1, idx2;
//   nums.forEach((ele, index) => {
//     let tempIdx = nums.indexOf(target - ele);
//     console.log('index', index);
//     console.log('tempIdx', tempIdx);
//     if (tempIdx !== -1 && tempIdx !== index) {
//       idx1 = index;
//       idx2 = tempIdx;
//     }
//   });
//   return [idx1, idx2]
// };


// 方法二 暴力法 看到题目后最先想到的就是两个循环嵌套，遍历每个元素 nums[i]，并查找是否存在一个值与 target - nums[i] 相等的目标元素。
// https://leetcode-cn.com/problems/two-sum/solution/1-liang-shu-zhi-he-javascript-san-chong-jie-fa-by-/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
//  var twoSum = function(nums, target) {
//   for (let i = 0; i < nums.length; i++) {
//       for (let j = i + 1; j < nums.length; j++) {
//           if (target - nums[i] === nums[j]) {
//               return [i, j];
//           }
//       }
//   }
//   console.log("No two sum solution");
// };

// 方法三 ：两遍哈希表
// 为了对运行时间复杂度进行优化，我们可以使用哈希表。一个简单的实现使用了两次迭代。在第一次迭代中，
// 我们将每个元素的值和它的索引添加到表中。然后，在第二次迭代中，我们将检查每个元素所对应的目标元素 target - nums[j] 
// 是否存在于表中。注意，该目标元素不能是 nums[j] 本身！
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
//  var twoSum = function(nums, target) {
//   // 构造哈希表
//   var map = new Map();
//   for (let i = 0; i < nums.length; i++) {
//       map.set(nums[i], i);
//   }
//   console.log('map',map);
//   for (let j = 0; j < nums.length; j++) {
//       let complement = target - nums[j];
//       if (map.has(complement) && map.get(complement) !== j) {
//           return [j, map.get(complement)];
//       }
//   }
//   console.log("No two sum solution");
// };

// 方法四：一遍哈希表
// 其实我们可以通过一遍哈希表完成查找，在进行迭代并将元素插入到表中的同时，
// 我们还会回过头来检查表中是否已经存在当前元素所对应的目标元素。如果它存在，
// 那我们已经找到了对应解，并立即将其返回。
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
  // 构造哈希表
  var map = new Map();
  for (let i = 0; i < nums.length; i++) {
      let complement = target - nums[i];
      if (map.has(complement)) {
          return [map.get(complement), i];
      }
      map.set(nums[i], i);
  }
  console.log("No two sum solution");
};


let indexArr =  twoSum(nums,target)
console.log(indexArr);