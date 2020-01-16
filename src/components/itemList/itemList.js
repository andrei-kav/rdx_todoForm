import React, { Component } from 'react';
import { connect } from 'react-redux';

import TodoItem from "../todoItem";
import { fetchItems, makeNotActual, requestIsFetching } from "../../todoItemsReducer";
import Spinner from "../spinner";
import todoListService from "../../services/todoListService";

class ItemList extends Component {

    todoListService = new todoListService();

    noActual = 'there is no actual posts';

    componentDidMount() {
        this.todoListService.getData()
            .then(itemList => {
                this.props.requestIsFetching(false);
                this.props.fetchItems(itemList);
            })
            .catch(err => {
                this.props.requestIsFetching(false);
                console.error(err)
            });
    }
    componentDidUpdate(prevProps) {
        if (this.props.isFetching !== prevProps.isFetching) this.componentDidMount();
    }

    renderItems = (items) => {
        return items.filter(item => !item.hidden).map((item) => {
                const { id, hidden, ...props } = item;
                const objProps = {...props, id, makeNotActual: this.props.makeNotActual};
                return (
                    <li key={id} hidden={hidden}>
                        <TodoItem {...objProps} />
                    </li>
                )
            });
    };

    render() {
        const { todoList, isFetching } = this.props;
        let elements = todoList.length ? this.renderItems(todoList) : 'no data';
        const content = isFetching ? <Spinner /> : <ul>{elements.length ? elements : this.noActual}</ul>;

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
        isFetching: todoItems.isFetching
    }
};
export default connect(mapStateToProps, { fetchItems, requestIsFetching, makeNotActual })(ItemList);
