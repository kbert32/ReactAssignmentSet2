import React, {useContext} from 'react';
import classes from './Navigation.module.css';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button/Button';

const Navigation = () => {
  const ctx = useContext(AuthContext);          //two ways to consume context, this way is more elegant but requires importing useContext
                                                //other way to consume is to use '.consumer'. (AuthContext.consumer)
  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <Button onClick={ctx.onLogout}>Logout</Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
            //<button onClick={ctx.onLogout}>Logout</button>
            //replaced this element with Button component
