import React, { useState } from 'react';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        { name: uName, age: uAge, id: Math.random().toString() },
      ];
    });
  };

  return (
    <>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </>
  );
}

export default App;

//'<>' and '</>' = <React.Fragment> = <Fragment> if 'import React' or 'import {Fragment} from 'react'; used
//<> and </> only usable if project setup supports it
//'<>''</>', <React.Fragment>, and <Fragment>  accomplish the same thing as the 'Wrapper' component


//React Portals can be used anywhere you would normally use JSX code
//allows us to render JSX/html code somewhere else, we can still communicate with it and use it as if though it
//will be rendered where we place it in our code, but it is rendered somewhere else at a specified location


//Refs can be connected to any HTML element