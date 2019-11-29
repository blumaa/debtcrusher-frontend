import { combineReducers } from "redux";
import user from "./userReducer";
import projects from "./projectReducer";
import projectBackers from "./projectBackersReducer";
import secondaryBackers from "./secondaryBackersReducer";


const rootReducer = combineReducers({
  user,
  projects,
  projectBackers,
  secondaryBackers
});

export default rootReducer;
