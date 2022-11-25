const userReducer = (state = {avatar: '/svg/star.svg'}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {avatar: '/svg/star.svg'};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
