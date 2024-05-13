import * as React from 'react';
import { createStore, applyMiddleware, Store} from 'redux'
import {Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
const store: any = createStore(reducers, applyMiddleware(thunk))

export default store