/*
 * @Descripttion: 
 * @version: 
 * @Author: OpenLcuk
 * @Date: 2021-11-25 10:08:29
 * @LastEditors: OpenLcuk
 * @LastEditTime: 2021-11-25 10:28:34
 */
import React from 'react'
import { Redirect } from 'react-router-dom'
// 页面
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';

export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => (<Redirect to={"/recommend"}></Redirect>)
      },
      {
        path: '/recommend',
        component: Recommend
      },
      {
        path: '/singers',
        component: Singers,
      },
      {
        path: '/rank',
        component: Rank
      }
    ]
  }
]

