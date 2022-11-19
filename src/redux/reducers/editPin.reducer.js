const pinToEdit = (state = {}, action) => {
  switch (action.type) {
    case 'SET_EDIT PIN':
      return action.payload;
    case 'UPDATE_PIN':
      return { 
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};
  
  export default pinToEdit;