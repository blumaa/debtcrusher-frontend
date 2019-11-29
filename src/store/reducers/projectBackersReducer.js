const projectBackerReducer = (
  state = { backers: [], requesting: false },
  action
) => {
  switch (action.type) {
    case "GET_BACKERS":
      return {
        backers: action.backers,
        requesting: true
      };
    case "POST_BACK_PROJECT":
      return {
        ...state,
        backers: [...state.backers, action.backer ],
        requesting: true
      };
    default:
      return state;
  }
};

export default projectBackerReducer;
