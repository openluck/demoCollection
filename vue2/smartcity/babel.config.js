/*
 * @Descripttion: 
 * @version: v3.10
 * @Author: wentan
 * @Date: 2020-09-22 16:24:25
 * @LastEditors: wentan
 * @LastEditTime: 2021-04-12 13:00:12
 */
module.exports = {
  // presets: ["@vue/cli-plugin-babel/preset", "@vue/babel-preset-jsx"],
  presets: [
    [
      "@vue/app",
      {
        "useBuiltIns": "entry"
      }
    ]
  ],
  plugins: [
    ["import", { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }] // `style: true` 会加载 less 文件
  ]
};
