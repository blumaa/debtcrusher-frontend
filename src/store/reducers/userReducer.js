const userReducer = (state = { users: [], requesting: false }, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.users,
        requesting: true
      };
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.user,
        requesting: true
      };
    case "AUTH_USER":
      return {
        ...state,
        currentUser: action.user,
        requesting: true
      };
    case "CLEAR_CURRENT_USER":
      return {
        ...state,
        currentUser: null,
        requesting: true
      };
    case "DONATION_POOL_UPDATE":
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.user.id ? action.user : user
        )
      };
    case "DONATION_POOL_SUBTRACT":
      return {
        ...state,
        currentUser: action.user,
        users: state.users.map(user =>
          user.id === action.user.id ? action.user : user
        )
      };
    default:
      return state;
  }
};

export default userReducer;
