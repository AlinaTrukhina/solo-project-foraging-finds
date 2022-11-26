const selectedPinReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SELECTED_PIN':
        return action.payload;
      case 'RESET_SELECTED_PIN':
        return {};
      default:
        return state;
    }
  };
  
  export default selectedPinReducer;
  