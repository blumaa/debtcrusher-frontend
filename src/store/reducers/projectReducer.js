const projectReducer = (
  state = { projects: [], requesting: false },
  action
) => {
  switch (action.type) {
    case "GET_PROJECTS":
      return {
        ...state,
        projects: action.projects,
        requesting: true
      };
    case "POST_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.project],
        requesting: true
      };
    case "UPDATE_PROJECT_AMOUNT":
      return {
        ...state,
        projects: state.projects.map(proj =>
          proj.id === action.project.id ? action.project : proj
        )
      };

    default:
      return state;
  }
};

export default projectReducer;
