import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import FundPerson from '../../pages/fundPerson'
import Home from '../../pages/home'

const Header = () => {
  const [toLink] = useState({
    name: '基金经理',
    path: 'fundPerson'
  })
  return (
    <div>
      {/* <Router> */}
        <nav style={{ margin: 10 }}>
          <Link to="/" style={{ padding: 5 }}>
            首页
          </Link>
          <Link to="/fundPerson" style={{ padding: 5 }}>
            基金经理
          </Link>
        </nav>
      {/* </Router> */}
    </div>
  )
}

export default Header