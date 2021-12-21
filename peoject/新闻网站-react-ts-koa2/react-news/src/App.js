/*
 * @Descripttion: 
 * @version: 
 * @Author: OpenLcuk
 * @Date: 2021-12-06 13:38:08
 * @LastEditors: OpenLcuk
 * @LastEditTime: 2021-12-20 14:01:48
 */
import Home from './pages/home'
import FundPerson from './pages/fundPerson';
import Layout from './layout/index'
import 'antd/dist/antd.css';
import { GlobalStyle } from './globalstyle.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      {/* <Header />
      <Home /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/fundPerson" element={<FundPerson />} />
          {/* <Route path="posts" element={<Posts />}>
            <Route path="/" element={<PostLists />} />
            <Route path=":slug" element={<Post />} />
          </Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
