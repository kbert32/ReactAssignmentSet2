import React, {useState, useCallback} from 'react';
import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';
import './App.css';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  console.log('App Running');

  const toggleParagraphHandler = useCallback(() => {    //useCallback retains original function between re-renders
    if (allowToggle) {
      setShowParagraph((prevShowParagraph) => !prevShowParagraph);  //this function form is recommended for updating the state where you may rely on the previous state snapshot
    }                                                               //this is because of state change scheduling where the state update may not happen instantly
  }, [allowToggle]);                                                //this ensures state changes are processed in order and for every state change that depends on the previous 
                                                                    //state snapshot, you get the latest state; theoretically state changes could possibly be postponed
  const allowToggleHandler = () => {                                //using useEffect bypasses this issue through the use of it's dependencies
    setAllowToggle(true);
  };

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph}/>
      <Button onClick={allowToggleHandler}>Allow Toggling!</Button>
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
    </div>
  );
}

export default App;

//One button component will re-render when App re-renders, the other will not
//because useCallback was used on one of the onClick handlers, but not the other