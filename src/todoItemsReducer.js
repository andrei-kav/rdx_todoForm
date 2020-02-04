import todoListService from "./services/todoListService";

const FETCH_ITEMS_FROM_DB = 'FETCH ITEMS FROM DB';
const TOGGLE_ITEM_ACTUAL = 'TOGGLE ITEM ACTUAL';
const REQUEST_IS_FETCHING = 'REQUEST IS FETCHING';
const HIDE_COMPLETED_POSTS = 'HIDE COMPLETED POSTS';
const SHOW_COMPLETED_POSTS = 'SHOW COMPLETED POSTS';

const initialState = {
    todoList: [],
    isFetching: false
};

const todoItemsReducer = (state = initialState, action) => {

    let stateCopy = {...state};

    switch (action.type) {
        case FETCH_ITEMS_FROM_DB:
            stateCopy.todoList = [...action.items];
            return stateCopy;
        case TOGGLE_ITEM_ACTUAL:
            stateCopy.todoList = [...state.todoList];
            const index = stateCopy.todoList.findIndex(elem => elem.id === action.id);
            const oldItem = stateCopy.todoList[index];
            oldItem.actual = !oldItem.actual;
            stateCopy.todoList = [...stateCopy.todoList.slice(0, index), oldItem, ...stateCopy.todoList.slice(index + 1)];
            return stateCopy;
        case REQUEST_IS_FETCHING:
            return { ...state, isFetching: action.isFetching };
        case HIDE_COMPLETED_POSTS:
            stateCopy.todoList = [...state.todoList].map(item => !item.actual ? { ...item, hidden: true} : item);
            return stateCopy;
        case SHOW_COMPLETED_POSTS:
            stateCopy.todoList = [...state.todoList].map(item => ({ ...item, hidden: false}));
            return stateCopy;
        default:
            return stateCopy;
    }
};

export default todoItemsReducer;

export const fetchItems = (items) => ({ type: FETCH_ITEMS_FROM_DB, items });
export const toggleItemActual = (id) => ({ type: TOGGLE_ITEM_ACTUAL, id });
export const requestIsFetching = (isFetching) => ({ type: REQUEST_IS_FETCHING, isFetching });
export const hideCompleted = () => ({ type: HIDE_COMPLETED_POSTS });
export const showCompleted = () => ({ type: SHOW_COMPLETED_POSTS });

const todoService = new todoListService();
export const fetchData = () => (dispatch) => {
    dispatch(requestIsFetching(true));
    todoService.getData()
        .then(itemList => {
            dispatch(requestIsFetching(false));
            dispatch(fetchItems(itemList));
        })
        .catch(err => {
            dispatch(requestIsFetching(false));
            console.error(err)
        });
};
export const toggleItemActualData = (...args) => (dispatch) => {
    dispatch(toggleItemActual(args[0])); // args[0] - т.е. достоем id из args
    todoService.toggleActualProp(...args)
        .catch(err => console.error(err));
};
