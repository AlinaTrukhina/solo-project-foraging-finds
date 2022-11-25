const newImage = (state = {url: '/svg/mushroom-no-image.svg'}, action) => {
  switch (action.type) {
    case 'SET_NEW_IMAGE':
      return action.payload;
    case 'RESET_NEW_IMAGE':
      return state;
    default:
      return state;
  }
}

export default newImage;
  