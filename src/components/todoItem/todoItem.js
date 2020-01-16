import React from "react";

import './todoItem.css';

const TodoItem = (props) => {

    const {id, label, actual, makeNotActual } = props;
    const classNames = !actual
        ? 'li-item not-actual'
        : 'li-item';
    return (
        <div className={classNames}>
            <span onClick={() => makeNotActual(id)}>{label}</span>
        </div>
    )
};

export default TodoItem;
