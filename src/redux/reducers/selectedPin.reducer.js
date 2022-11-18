const selectedPinReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SELECTED_PIN':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default selectedPinReducer;
  