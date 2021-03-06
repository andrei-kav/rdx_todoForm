import React from "react";

import './todoItem.css';

const TodoItem = (props) => {

    const {id, label, actual, toggleItemActualData } = props;
    const classNames = !actual
        ? 'li-item not-actual'
        : 'li-item';
    return (
        <div onSelect={(e) => e.preventDefault()}
             onMouseDown={(e) => e.preventDefault()}
             className={classNames} >
            <span onClick={() => {
                    toggleItemActualData(id, label, !actual);
                }}>{label }</span>
        </div>
    )
};

export default TodoItem;
