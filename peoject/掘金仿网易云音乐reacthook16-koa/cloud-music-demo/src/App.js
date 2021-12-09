/*
 * @Descripttion: 
 * @version: 
 * @Author: OpenLcuk
 * @Date: 2021-11-25 09:55:00
 * @LastEditors: OpenLcuk
 * @LastEditTime: 2021-11-25 11:03:14
 */
import { GlobalStyle } from './style'
import { IconStyle } from './assets/iconfont/iconfont';

import React from 'react';

import routes from './routes'
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';//renderRoutes 读取路由配置转化为 Route 标签

import store from './store';
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>

  );
}

export default App;
