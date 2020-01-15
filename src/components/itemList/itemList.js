import React, { Component } from 'react';
import { connect } from 'react-redux';

import TodoItem from "../todoItem";
import { fetchItems, makeNotActual, toggleIsWaiting, shitHappens } from "../../todoItemsReducer";
import Spinner from "../spinner";
import todoListService from "../../services/todoListService";

class ItemList extends Component {

    todoListService = new todoListService();

    componentDidMount() {
        this.todoListService.getData()
            .then(itemList => {
                this.props.toggleIsWaiting(false);
                this.props.fetchItems(itemList);
            })
            .catch(err => {
                this.props.toggleIsWaiting(false);
                console.error(err)
            });
    }

    renderItems = (items) => {
        return items
            ? items.map((item) => {
                const { id, ...props } = item;
                return (
                    <li key={id} onClick={() => this.props.makeNotActual(id)} >
                        <TodoItem {...props} />
                    </li>
                )
            })
            : null;
    };

    render() {
        const { todoList, isWaiting } = this.props;
        const elements = todoList.length ? this.renderItems(todoList) : 'no data';
        const content = isWaiting ? <Spinner /> : <ul>{elements}</ul>;

        return (
            <>
                {content}
            </>
        )
    }
}



const mapStateToProps = (state) => {
    const todoItems = state.todoItems;
    return {
        todoList: [...todoItems.todoList],
        isWaiting: todoItems.isWaiting
    }
};
export default connect(mapStateToProps, { fetchItems, toggleIsWaiting, shitHappens, makeNotActual })(ItemList);
