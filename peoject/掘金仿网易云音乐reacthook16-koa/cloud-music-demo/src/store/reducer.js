/*
 * @Descripttion: 
 * @version: 
 * @Author: OpenLcuk
 * @Date: 2021-11-25 11:01:34
 * @LastEditors: OpenLcuk
 * @LastEditTime: 2021-11-25 13:58:48
 */
import { combineReducers } from "redux";
import { reducer as recommendReducer } from '../application/Recommend/store/index';

export default combineReducers({
  // 之后开发具体功能模块的时候添加 reducer
  recommend: recommendReducer,
})