import React, {useRef, useImperativeHandle} from 'react';

const Input = React.forwardRef (function Input (props, ref) {
    const inputRef = useRef();

    function activate () {
        inputRef.current.focus();
    };

    useImperativeHandle(ref, () => {
        return {
            focus: activate,
        };
    });

    return (
        <div className={`${props.classes.control} ${props.stateType.isValid === false ? props.classes.invalid : ''}`}>
            <label htmlFor={props.fieldType}>{props.label}</label>
            <input ref={inputRef} type={props.fieldType} id={props.fieldType} value={props.stateType.value} onChange={props.onChange} onBlur={props.onBlur}/>
        </div>
    );
});

export default Input;