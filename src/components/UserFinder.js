// import {Fragment, useState, useEffect} from 'react';       //not usable in a class based component
import { Component } from 'react';

import classes from './UserFinder.module.css';
import Users from './Users';
import UsersContext from '../store/users-context';
import ErrorBoundary from './ErrorBoundary';

// const DUMMY_USERS = [
//     { id: 'u1', name: 'Max' },
//     { id: 'u2', name: 'Manuel' },        //moved to App component to utilize useContext
//     { id: 'u3', name: 'Julie' },
//   ];

class UserFinder extends Component {
    static contextType = UsersContext;  //only one context may assigned per component when using class based components
                                        //context consumer component could also be used within the render method just as in 
    constructor() {                     //a functional component:  <UsersContext.Consumer>
        super();
        this.state = {
            filteredUsers: [],      //this array is empty because we are intending to pull the array from an http request
            searchTerm: ''
        };
    }

    componentDidMount() {           //componentDidMount is similar to using useEfftect with no dependencies, it only runs the first time the component renders
        //send http request...      //in this example we are pretending to pull data for DUMMY_USERS from an http request
        this.setState({filteredUsers: this.context.users}); //this.context.users accesses the context
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.setState({
                filteredUsers: this.context.users.filter((user) => user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())),
            });
        }
    }
    
    searchChangeHandler(event) {
        this.setState({searchTerm: event.target.value});
    }

    render() {
        return (
            <>
                <div className={classes.finder}>
                  <input type='search' onChange={this.searchChangeHandler.bind(this)} />
                </div>
                <ErrorBoundary>
                    <Users users={this.state.filteredUsers} />
                </ErrorBoundary>
            </>
        );        
    }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//         <div className={classes.finder}>
//           <input type='search' onChange={searchChangeHandler} />
//         </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;
