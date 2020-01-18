import React, { Component } from "react";
import { connect } from 'react-redux';
import { Form, FormGroup, Input } from 'reactstrap';

import { saveValue, uploadItemData } from "../../itemAddFormReducer";
import { hideCompleted, showCompleted } from "../../todoItemsReducer";

import './itemAddForm.css';

class ItemAddForm extends Component {

    onValueChange = (e) => {
        this.props.saveValue(e.target.value);
    };
    onSubmit = (e) => {
        e.preventDefault();
        const { text, uploadItemData } = this.props;
        text
            ? uploadItemData(text)
            : alert('The form is empty. Write a todo post');
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

export default connect(mapStateToProps, { saveValue, uploadItemData, hideCompleted, showCompleted })(ItemAddForm);