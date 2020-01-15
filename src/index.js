import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/app/App';
import todoItemsReducer from './todoItemsReducer';
import itemAddFormReducer from "./itemAddFormReducer";

const reducers = combineReducers({
    todoItems: todoItemsReducer,
    itemAddForm: itemAddFormReducer
});
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
