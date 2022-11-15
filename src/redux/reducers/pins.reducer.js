const pinsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PINS':
      return action.payload;
    default:
      return state;
  }
};

export default pinsReducer;
