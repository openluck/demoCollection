import Home from './pages/home'
import FundPerson from './pages/fundPerson';
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
          <Route path="/" element={<Home />} />
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
