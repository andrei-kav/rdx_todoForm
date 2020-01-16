import React, { Component } from "react";
import { connect } from 'react-redux';
import { Form, FormGroup, Input } from 'reactstrap';

import { saveValue, removeValue, waitUploading } from "../../itemAddFormReducer";
import { fetchItems, requestIsFetching, hideCompleted, showCompleted, startUpdating } from "../../todoItemsReducer";
import todoListService from "../../services/todoListService";
import './itemAddForm.css';

class ItemAddForm extends Component {

    todoListService = new todoListService();

    onValueChange = (e) => {
        this.props.saveValue(e.target.value);
    };
    onSubmit = (e) => {
        e.preventDefault();
        const { text, removeValue, waitUploading, requestIsFetching, startUpdating } = this.props;
        if (text) {
            waitUploading(true);
            this.todoListService.uploadItemToDB(text)
                .then(() => {
                    waitUploading(false);
                    removeValue();
                    requestIsFetching(true);
                    startUpdating()})
                .catch(err => {
                    waitUploading(false);
                    console.error(err);
                })
        } else {
            alert('The form is empty. Write a todo post');
        }
    };

    render() {
        const { text, isUploading, hideCompleted, showCompleted } = this.props;
        return (
            <Form className="item-add-form"
                  onSubmit={this.onSubmit}>
                <FormGroup>
                    <Input type="text"
                           name="newItem"
                           placeholder="Enter a new todo item"
                           plaintext
                           onChange={this.onValueChange}
                           value={text}/>
                </FormGroup>
                <div className="d-flex justify-content-around">
                    <button type="button"
                            className="btn"
                            onClick={hideCompleted}
                            disabled={isUploading}>Hide completed
                    </button>
                    <button type="button"
                            className="btn"
                            onClick={showCompleted}
                            disabled={isUploading}>Show completed
                    </button>
                    <button type="submit"
                            className="btn"
                            disabled={isUploading}>Add new
                    </button>
                </div>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        text: state.itemAddForm.text,
        isUploading: state.itemAddForm.isUploading,

        todoList: [...state.todoItems.todoList]
    }
};

export default connect(mapStateToProps, { saveValue, removeValue, waitUploading, fetchItems, requestIsFetching, hideCompleted, showCompleted, startUpdating })(ItemAddForm);