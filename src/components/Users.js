// import { useState } from 'react';      //useState hook is not used for class based components
import {Component} from 'react';
import User from './User';
import classes from './Users.module.css';

//the state property must always be named state since it is part of the built in Component class
//state must be an object in class based components, all states for any given component must be included
//within the same state object as properties of that object

class Users extends Component {
  constructor() {
    super();
    this.state = {
      showUsers: true
    };
  }

  componentDidUpdate() {
    // try {
    //   someCodeWhichMightFail()       //example of how we might handle errors, but if we want to handle the error in a parent component
    // } catch (err) {                  //we can not do it this way since the child component is basically jsx code within the parent
    //   //handle error
    // }

    if (this.props.users.length === 0) {
      throw new Error('No users provided');
    }
  }

//when using the setState method, you must pass an object and that object will be merged
//with the current state object
  toggleUsersHandler() {
    // this.setState({showUsers: false});   //we could normally pass an object like this, but since the 
    this.setState((curState) => {           //new value depends on the previous state we need to pass a function
      return {showUsers: !curState.showUsers};    //that uses the current state as an argument
    })
  }

  render() {
    const usersList = (       //we can still define helper constants within the render method
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );
                          //bind must be used when calling the handler method because 'this' does not refer to the surrounding class
    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>  
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}


//functional component version that is replaced:

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
