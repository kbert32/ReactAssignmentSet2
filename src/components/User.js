import {Component} from 'react';      //Component is a class built in to react

import classes from './User.module.css';

class User extends Component {        //by extending, User class inherits properties from the Component class 
                                      //allowing us to access props through the 'this' keyword
  componentWillUnmount() {
    console.log('User will unmount!');  //this code only runs when this component is removed from the DOM, note it will run 3 times
  }                                     //for every time that we click the 'show users' button because there are 3 instances 
                                        //of this component, one for each 'user name'
  render() {                          
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

//functional component that was replaced with class based component

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
