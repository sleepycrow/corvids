import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './assets/App.css';
import { HeaderSearch } from './components/HeaderSearch';
import { Home } from './routes/Home';
import { Search } from './routes/Search';
import { Video } from './routes/Video';
import { Channel } from './routes/Channel';
import { appName } from './utils/ui';
import { Settings } from './routes/Settings';

function App() {
  return (
    <div className='react-app'>
      <header>
        <div className='header__container'>
          <div className='header__logo'>
            <Link to="/">{appName}</Link>
          </div>
      
          <div className='header__search'>
            <HeaderSearch />
          </div>
      
          <div className='header__options'>
            <Link to="/settings">
              <span className='material-icons'>settings</span>
            </Link>
          </div>
        </div>
      </header>
      
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/results" element={ <Search /> } />
        <Route path="/watch" element={ <Video /> } />
        <Route path="/channel/:channelId" element={ <Channel /> } />
        <Route path="/settings" element={ <Settings /> } />
      </Routes>
      
      <footer>
        <a href="https://github.com/sleepycrow/crowtube">Source Code</a>
      </footer>
    </div>
  );
}

export default App;
