import { updateProjectAmount } from "./projects";
import { donationPoolUpdate } from "./users";

export const GET_BACKERS = "GET_BACKERS";

export const getBackers = backers => ({ type: GET_BACKERS, backers });

export const fetchBackers = () => {
  // console.log('this is the dispatch action project', project)
  return async dispatch => {
    try {
      const response = await fetch("http://localhost:8080/api/projectBackers");
      const json = await response.json();
      // console.log(json)
      dispatch(getBackers(json));
    } catch (error) {
      console.error("Error fetching backers:", error);
    }
  };
};

// Post ProjectBacker

export const POST_BACK_PROJECT = "POST_BACK_PROJECT";

export const backProject = backer => ({ type: POST_BACK_PROJECT, backer });

export const postProjectBacker = (backerId, projectId, amount, userId) => {
  // console.log(backerId, projectId, amount, userId);
  // split up the amount

  // console.log("total amount", amount);

  const newAmount = parseInt(amount);

  const donationPoolAmount = (10 / 100) * newAmount; //amount to go into the user's donation pool

  // console.log(donationPoolAmount);

  const userProjectAmount = (90 / 100) * newAmount; //amount to go into the user's proejct

  // console.log(userProjectAmount);

  // amount that goes into the user's pool

  return async dispatch => {
    // amount that goes to project - create projectBacker join table
    try {
      /* create new projectbacker join table */

    const donObj = {
        // amount that goes into the user's pool
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: userId,
          donationPool: donationPoolAmount
        })
      };

      const res2 = await fetch(
        "http://localhost:8080/api/users/" + userId + "/donationPool",
        donObj
      );
      const user = await res2.json();
      // console.log(user);
      dispatch(donationPoolUpdate(user));



      const reqObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          backerId,
          projectId,
          amount: userProjectAmount
        })
      };

      const response = await fetch(
        "http://localhost:8080/api/projectBackers/",
        reqObj
      );
      const json = await response.json();
      // console.log(json);
      dispatch(backProject(json));

      /* update project amount */
      const reqObj2 = {
        // update that project's goal - subtract from total
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectId,
          amount: userProjectAmount
        })
      };
      const res = await fetch(
        "http://localhost:8080/api/projects/" + projectId,
        reqObj2
      );
      const project = await res.json();
      // console.log("look at this project", project);
      return dispatch(updateProjectAmount(project));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
};
