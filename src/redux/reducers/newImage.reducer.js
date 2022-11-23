const newImage = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NEW_IMAGE':
      return action.payload;
    case 'RESET_NEW_IMAGE':
      return {};
    default:
      return state;
  }
};

export default newImage;
  