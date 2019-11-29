const secondaryBackersReducer = (
  state = { secondaryBackers: [], requesting: false },
  action
) => {
  switch (action.type) {
    case "GET_SECONDARY_BACKERS":
      return {
        ...state,
        secondaryBackers: action.secondaryBackers,
        requesting: true
      };
    case "POST_SECONDARY_BACKER":
      return {
        ...state,
        secondaryBackers: [...state.secondaryBackers, action.secondaryBacker],
        requesting: true
      };
    default:
      return state;
  }
};

export default secondaryBackersReducer;
