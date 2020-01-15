const FETCH_ITEMS_FROM_DB = 'FETCH ITEMS FROM DB';
const ADD_ITEM_TO_TODO_LIST = 'ADD ITEM TO TODO_LIST';
const MAKE_ITEM_NOT_ACTUAL = 'MAKE ITEM NOT ACTUAL';
const TOGGLE_IS_WAITING = 'TOGGLE IS WAITING';
const SHIT_HAPPENS = 'SHIT HAPPENS';

const initialState = {
    todoList: [],
    isWaiting: true,
    error: false
};

const todoItemsReducer = (state = initialState, action) => {

    let stateCopy = {...state};

    switch (action.type) {
        case FETCH_ITEMS_FROM_DB:
            stateCopy.todoList = [...action.items];
            return stateCopy;
        case ADD_ITEM_TO_TODO_LIST:
            stateCopy.todoList = [action.item, ...state.todoList];
            //stateCopy.todoList.unshift(action.item);
            return stateCopy;
        case MAKE_ITEM_NOT_ACTUAL:
            stateCopy.todoList = [...state.todoList];
            const index = stateCopy.todoList.findIndex(elem => elem.id === action.id);
            const oldItem = stateCopy.todoList[index];
            oldItem.actual = !oldItem.actual;
            stateCopy.todoList = [...stateCopy.todoList.slice(0, index), oldItem, ...stateCopy.todoList.slice(index + 1)];
            return stateCopy;
        case TOGGLE_IS_WAITING:
            return { ...state, isWaiting: action.isWaiting };
        case SHIT_HAPPENS:
            return { ...state, error: action.error };
        default:
            return stateCopy;
    }
};

export default todoItemsReducer;

export const fetchItems = (items) => ({ type: FETCH_ITEMS_FROM_DB, items });
export const addItem = (item) => ({ type: ADD_ITEM_TO_TODO_LIST, item });
export const makeNotActual = (id) => ({ type: MAKE_ITEM_NOT_ACTUAL, id });
export const toggleIsWaiting = (isWaiting) => ({ type: TOGGLE_IS_WAITING, isWaiting });
export const shitHappens = (error) => ({ type: TOGGLE_IS_WAITING, error });