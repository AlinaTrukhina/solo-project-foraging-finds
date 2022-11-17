const pinsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_PINS':
      return action.payload;
    case 'SET_SEARCHED_PINS':
      return action.payload;
    default:
      return state;
  }
};

export default pinsReducer;
