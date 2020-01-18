import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from "redux-thunk";

import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import App from './components/app/App';
import todoItemsReducer from './todoItemsReducer';
import itemAddFormReducer from "./itemAddFormReducer";

const reducers = combineReducers({
    todoItems: todoItemsReducer,
    itemAddForm: itemAddFormReducer
});
const store = createStore(reducers, compose(
    applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
