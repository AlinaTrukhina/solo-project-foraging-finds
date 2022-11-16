const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ACTIVE_PIN_COMMENTS':
      return action.payload;
    default:
      return state;
  }
};

export default commentsReducer;
