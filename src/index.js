//import react from 'react';
import reactDOM from 'react-dom';
import App from './App';


import {createStore, applyMiddleware, compose} from 'redux';
import  allReducers  from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(allReducers, composeEnhancer(applyMiddleware(thunk)));

reactDOM.render(
<Provider store={store}>
    <App />
</Provider>,
document.getElementById('root'));

