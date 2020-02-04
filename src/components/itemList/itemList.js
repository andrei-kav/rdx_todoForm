import React, { Component } from 'react';
import { connect } from 'react-redux';

import TodoItem from "../todoItem";
import { requestIsFetching, fetchData, toggleItemActualData } from "../../todoItemsReducer";
import Spinner from "../spinner";

class ItemList extends Component {

    noActual = 'there is no actual posts';

    componentDidMount() {
        // this.props.requestIsFetching(true);
        this.props.fetchData();
    }
    componentDidUpdate(prevProps) {
        const { isUpdating, fetchData } = this.props;
        if (isUpdating !== prevProps.isUpdating) {
            fetchData();
        }
    }
    renderItems = (items) => {
        const { toggleItemActualData } = this.props;
        return items.filter(item => !item.hidden).map((item) => {
                const objProps = {...item, toggleItemActualData};
                return (
                    <li key={item.id} >
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

        isUpdating: state.itemAddForm.isUpdatingTodoList
    }
};
export default connect(mapStateToProps, { requestIsFetching, fetchData, toggleItemActualData })(ItemList);
