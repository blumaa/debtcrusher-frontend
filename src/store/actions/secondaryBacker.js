import { updateProjectAmount } from "./projects";
import { donationPoolSubtract } from "./users";

export const GET_SECONDARY_BACKERS = "GET_SECONDARY_BACKERS";

export const getSecondaryBackers = secondaryBackers => ({ type: GET_SECONDARY_BACKERS, secondaryBackers });

export const fetchSecondaryBackers = () => {
  // console.log('this is the dispatch action project', project)
  return async dispatch => {
    try {
      const response = await fetch("https://debt-crusher-backend.herokuapp.com/api/secondaryBackers");
      const json = await response.json();
      // console.log(json)
      dispatch(getSecondaryBackers(json));
    } catch (error) {
      console.error("Error fetching secondary backers:", error);
    }
  };
};



export const POST_SECONDARY_BACKER = 'POST_SECONDARY_BACKER'

export const postSecondaryBacker = secondaryBacker => ({type: POST_SECONDARY_BACKER, secondaryBacker})

export const createSecondaryBacker = ({amount, userId, projectId}) => {

  return async dispatch => {
    try {
      const reqObj = { // create a secondary backer
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount,
          userId,
          projectId
        })
      }
      const response = await fetch('https://debt-crusher-backend.herokuapp.com/api/secondaryBackers', reqObj)
      const json = await response.json()
      // console.log(json)
      dispatch(postSecondaryBacker(json))


      const donObj = {
          // subtract from user's donation pool
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: userId,
            amount
          })
        };

        const res2 = await fetch(
          "https://debt-crusher-backend.herokuapp.com/api/users/" + userId + "/donationSubtract",
          donObj
        );
        const user = await res2.json();
        // console.log('this is the donation pool patch');
        // console.log(user);
        dispatch(donationPoolSubtract(user));


      const reqObj2 = {
        // update that project's goal - subtract from total
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectId,
          amount
        })
      };
      const res = await fetch(
        "https://debt-crusher-backend.herokuapp.com/api/projects/" + projectId,
        reqObj2
      );
      const project = await res.json();
      console.log("look at this project", project);
      return dispatch(updateProjectAmount(project));

    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }
}
