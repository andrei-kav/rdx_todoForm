import React from 'react';

import ItemList from "../itemList";
import ItemAddForm from "../itemAddForm";

import './todoForm.css';

const TodoForm = () => {
    return (
            <div className="todo-form">
                <ItemList />
                <ItemAddForm />
            </div>
    )
};

export default TodoForm;