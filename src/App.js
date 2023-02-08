import UserFinder from './components/UserFinder';
import UsersContext from './store/users-context';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

function App() {
  const usersContext = {
    users: DUMMY_USERS
  }

  return (
    <UsersContext.Provider value={usersContext}>
      <UserFinder />
    </UsersContext.Provider>
  );
}

export default App;


//Class based component Lifecycle methods:

//componentDidMount()           
        //called only once when component is first evaluated and rendered
        //similar to using useEffect with no dependencies

//componentDidUpdate() 
        //called whenever the component updates and renders
        //similar to using useEffect with dependencies
        //uses two parameters:  prevProps and prevState
        //prevProps and prevState can be used to make comparisons to decided if a state should be updated

//componentWilUnmount()
        //called right before a component is removed from the DOM
        //similar to the useEffect "cleanup" function, the return statement