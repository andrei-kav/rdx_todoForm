import React, { Component } from "react";
import { connect } from 'react-redux';
import { Form, FormGroup, Input } from 'reactstrap';

import { saveValue, removeValue, waitUploading } from "../../itemAddFormReducer";
import { fetchItems, requestIsFetching } from "../../todoItemsReducer";
import todoListService from "../../services/todoListService";
import './itemAddForm.css';

class ItemAddForm extends Component {

    todoListService = new todoListService();

    onValueChange = (e) => {
        this.props.saveValue(e.target.value);
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (this.props.text) {
            this.props.waitUploading(true);
            this.todoListService.uploadItemToDB(this.props.text)
                .then(() => {
                    this.props.waitUploading(false);
                    this.props.removeValue();
                    this.props.requestIsFetching(true)})
                .catch(err => {
                    this.props.waitUploading(false);
                    console.error(err);
                })
        } else {
            alert('The form is empty. Write a todo post');
        }
    };
    onHideCompleted = (e) => {
        e.preventDefault();
        let elements = this.props.todoList.map(item => !item.actual ? { ...item, hidden: true} : item);
        this.props.fetchItems(elements);
    };

    render() {

        return (
            <Form className="item-add-form"
                  onSubmit={this.onSubmit}>
                <FormGroup>
                    <Input type="text"
                           name="newItem"
                           placeholder="Enter a new todo item"
                           plaintext
                           onChange={this.onValueChange}
                           value={this.props.text}/>
                </FormGroup>
                <div className="d-flex justify-content-center">
                    <button type="button"
                            className="btn"
                            onClick={this.onHideCompleted}
                            disabled={this.props.isUploading}>Hide completed</button>
                    <button type="submit"
                            className="btn"
                            disabled={this.props.isUploading}>Add new</button>
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

export default connect(mapStateToProps, { saveValue, removeValue, waitUploading, fetchItems, requestIsFetching })(ItemAddForm);