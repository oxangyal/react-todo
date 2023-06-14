import React from "react";

function InputWithLabel(props) {
    return (
        <>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                id={props.id}
                name="title"
                type="text"
                value={props.todoTitle}
                onChange={props.onChange}
            ></input>
        </>
    );
}

export default InputWithLabel;
