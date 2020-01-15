import React from "react";

import './todoItem.css';

const TodoItem = (props) => {

    const { label, actual } = props;
    let classNames = 'li-item';
    classNames = !actual
        ? classNames += ' not-actual'
        : classNames;
    return (
        <div className={classNames}>
            {label}
        </div>
    )
};

export default TodoItem;
