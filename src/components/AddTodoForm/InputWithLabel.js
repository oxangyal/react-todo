import "./AddTodoForm.module.css";

import React, { useEffect, useRef } from "react";

import PropTypes from "prop-types";

function InputWithLabel(props) {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    });

    return (
        <>
            <label htmlFor={props.id}>{props.children}</label>
            <input 
                autoFocus="autoFocus"
                id={props.id}
                name="title"
                type="text"
                value={props.value}
                onChange={props.onChange}
                ref={inputRef}
                placeholder="What do you have planned today?"
            ></input>
        </>
    );
}

InputWithLabel.propTypes = {
    id: PropTypes.string,
    children: PropTypes.object,
    value: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    onInputChange: PropTypes.func,
};

export default InputWithLabel;
