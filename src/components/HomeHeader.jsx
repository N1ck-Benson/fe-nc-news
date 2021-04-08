import React from 'react';
import {Link} from '@reach/router'

const HomeHeader = () => {
  return (
    <header>
      <h1>NC News</h1>
      <nav>
        <Link to="/home" className="header-link">
          Home
        </Link>
        <Link to="/home/topics" className="header-link">
          Topics
        </Link>
      </nav>
    </header>
  );
};

export default HomeHeader;