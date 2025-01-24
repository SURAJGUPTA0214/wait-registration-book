// reducers/index.js
import { combineReducers } from 'redux';
// import userReducer from './userSlice';
// import productReducer from './productSlice';
// import waitingRegistrationReducer from './waitingRegistrationSlice';
import waitingRegistrationReducer from './pages/waitingRegistration/waitingRegistrationSlice';

const rootReducer = combineReducers({
   waitingRegistration: waitingRegistrationReducer
});

export default rootReducer;
