import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';

import './navigation.styles.css';

const Navigation = () => {
  return (
    <Fragment>
      <div className='navigation'>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/products'>
            PRODUCTS
          </Link>
          <Link className='nav-link' to='/upload'>
            DATALOAD
          </Link>
        </div>
      </div>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
