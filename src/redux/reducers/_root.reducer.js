import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import pins from './pins.reducer';
import comments from './comments.reducer';
import selectedPin from './selectedPin.reducer';
import userPins from './userPins.reducer';
import pinToEdit from './editPin.reducer';
import newImage from './newImage.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  pins,
  comments,
  selectedPin,
  userPins,
  pinToEdit,
  newImage
});

export default rootReducer;
