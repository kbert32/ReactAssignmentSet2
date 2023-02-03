import React from 'react';
import MyParagraph from './MyParagraph';

function DemoOutput (props) {
    console.log('DemoOutput Running');
    return <MyParagraph>{props.show ? 'This is new!' : ''}</MyParagraph>;
};

export default React.memo(DemoOutput);  //React.memo keeps the component from re-rendering due to a parent re-render unless props change