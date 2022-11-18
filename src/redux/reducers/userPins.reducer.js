const userPinsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_PINS':
      return action.payload;
    default:
      return state;
  }
};

export default userPinsReducer;