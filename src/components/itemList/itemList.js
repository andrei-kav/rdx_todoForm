import React, { Component } from 'react';
import { connect } from 'react-redux';

import TodoItem from "../todoItem";
import { fetchItems, makeNotActual, requestIsFetching, startUpdating } from "../../todoItemsReducer";
import Spinner from "../spinner";
import todoListService from "../../services/todoListService";

class ItemList extends Component {

    todoListService = new todoListService();

    noActual = 'there is no actual posts';

    componentDidMount() {
        requestIsFetching(true);
        this.fetchDATA();
    }
    componentDidUpdate(prevProps) {
        if (this.props.isUpdating !== prevProps.isUpdating) {
            this.fetchDATA()
        }
    }

    fetchDATA = () => {
        const { requestIsFetching, fetchItems } = this.props;
        this.todoListService.getData()
            .then(itemList => {
                requestIsFetching(false);
                fetchItems(itemList);
            })
            .catch(err => {
                requestIsFetching(false);
                console.error(err)
            });
    };
    renderItems = (items) => {
        const { makeNotActual } = this.props;
        return items.filter(item => !item.hidden).map((item) => {
                const { id, ...props } = item;
                const objProps = {...props, id, makeNotActual};
                return (
                    <li key={id} >
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
        isFetching: todoItems.isFetching,
        isUpdating: todoItems.isUpdating
    }
};
export default connect(mapStateToProps, { fetchItems, requestIsFetching, makeNotActual, startUpdating })(ItemList);
