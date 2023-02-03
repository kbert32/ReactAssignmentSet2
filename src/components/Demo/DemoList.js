import React, { useMemo } from 'react';

import classes from './DemoList.module.css';

const DemoList = (props) => {
  const { items } = props;    //destructuring to pull items out of props into new variable

  const sortedList = useMemo(() => {    //useMemo ensures that the array is not re-sorted after every re-render
    console.log('Items sorted');        //only when 'items' changes, however since arrays are a reference type of data
    return items.sort((a, b) => a - b); //useMemo must also be used on the original array within the App component
  }, [items]); 
  console.log('DemoList RUNNING');

  return (
    <div className={classes.list}>
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(DemoList);
