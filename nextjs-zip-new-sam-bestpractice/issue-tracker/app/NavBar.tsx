import React from 'react';
import { Link } from 'react-router-dom';
('use client');
import { createContext } from 'react';

const Context = createContext();

const NavBar = () => {
  return (
    <nav className='flex'>
      <link href='/'>Logo</link>
      <ul>
        <li>
          <Link ref='/'>Dashboard</Link>
        </li>
        <li>
          <Link ref='/issues'>Issues</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
