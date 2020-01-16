const FETCH_ITEMS_FROM_DB = 'FETCH ITEMS FROM DB';
const MAKE_ITEM_NOT_ACTUAL = 'MAKE ITEM NOT ACTUAL';
const REQUEST_IS_FETCHING = 'REQUEST IS WAITING';
// const SHIT_HAPPENS = 'SHIT HAPPENS';

const initialState = {
    todoList: [],
    isFetching: true,
    error: false
};

const todoItemsReducer = (state = initialState, action) => {

    let stateCopy = {...state};

    switch (action.type) {
        case FETCH_ITEMS_FROM_DB:
            stateCopy.todoList = [...action.items];
            return stateCopy;
        case MAKE_ITEM_NOT_ACTUAL:
            stateCopy.todoList = [...state.todoList];
            const index = stateCopy.todoList.findIndex(elem => elem.id === action.id);
            const oldItem = stateCopy.todoList[index];
            oldItem.actual = !oldItem.actual;
            stateCopy.todoList = [...stateCopy.todoList.slice(0, index), oldItem, ...stateCopy.todoList.slice(index + 1)];
            return stateCopy;
        case REQUEST_IS_FETCHING:
            return { ...state, isFetching: action.isFetching };
        // case SHIT_HAPPENS:
        //     return { ...state, error: action.error };
        default:
            return stateCopy;
    }
};

export default todoItemsReducer;

export const fetchItems = (items) => ({ type: FETCH_ITEMS_FROM_DB, items });
export const makeNotActual = (id) => ({ type: MAKE_ITEM_NOT_ACTUAL, id });
export const requestIsFetching = (isFetching) => ({ type: REQUEST_IS_FETCHING, isFetching });
// export const shitHappens = (error) => ({ type: TOGGLE_IS_WAITING, error });