import React, { useState, useCallback, useMemo } from 'react';

import './App.css';
import DemoList from './components/Demo/DemoList';
import Button from './components/UI/Button/Button';

function App() {
  const [listTitle, setListTitle] = useState('My List');

  const changeTitleHandler = useCallback(() => {
    setListTitle('New Title');
  }, []);

  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);  //useMemo is used here to ensure this reference data is not rebuilt
                                                          //after every re-render, thus allowing the useMemo within the DemoList 
  return (                                                //component to keep the sort from re-running after every re-render
    <div className="app">
      <DemoList title={listTitle} items={listItems} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
    </div>
  );
}

export default App;

//useCallback is for retaining object functions
//useMemo is for retaining other types of simple data
//useCallback will be used more often than useMemo since memoizing functions is more useful
//memoize data when it may be performance intensive to recalculate something based on it
