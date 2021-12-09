/*
 * @Descripttion: 
 * @version: 
 * @Author: OpenLcuk
 * @Date: 2021-11-25 10:29:34
 * @LastEditors: OpenLcuk
 * @LastEditTime: 2021-11-25 11:10:04
 */
//src/appliction/Home/index.js
import React, { useEffect } from 'react';

import { renderRoutes } from "react-router-config";

import { NavLink } from 'react-router-dom';// 利用 NavLink 组件进行路由跳转

import { Top, TabItem, Tab } from './style'



function Home(props) {

  const { route } = props

  return (
    <div>
      {/* 顶栏 */}
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      {/* tab栏 */}
      <Tab>
        <NavLink to="/recommend" activeClassName="selected"><TabItem><span > 推荐 </span></TabItem></NavLink>
        <NavLink to="/singers" activeClassName="selected"><TabItem><span > 歌手 </span></TabItem></NavLink>
        <NavLink to="/rank" activeClassName="selected"><TabItem><span > 排行榜 </span></TabItem></NavLink>
      </Tab>

      {renderRoutes(route.routes)}
    </div>
  )
}

export default React.memo(Home);