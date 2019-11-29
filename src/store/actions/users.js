export const GET_USERS = 'GET_USERS'

export const getUsers = users => ({type: GET_USERS, users})

export const fetchUsers = () => {
  // console.log('this is the dispatch action project', project)
  return async dispatch => {
    try {
      const response = await fetch('http://localhost:8080/api/users')
      const json = await response.json()
      // console.log('*************************************',json)
      dispatch(getUsers(json))
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }
}



export const setCurrentUser = user => ({
  type: "SET_CURRENT_USER",
  user
});

export const loginUser = (user, history) => {
  return async dispatch => {
    try {
      const payload = JSON.stringify(user);
      const reqObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: payload
      };
      // console.log(user);
      const resp = await fetch("http://localhost:8080/api/users/login", reqObj);
      const data = await resp.json();
      dispatch(setCurrentUser(data.user));
      // console.log(data);
      localStorage.setItem("token", data.token);
      history.push("/exploreProjects");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};


export const postSignUpUser = user => ({
  type: "SET_CURRENT_USER",
  user
});

export const signUpUser = (user, history) => {
  return async dispatch => {
    try {
      const reqObj = {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(user)
      };
      const resp = await fetch("http://localhost:8080/api/users/signup", reqObj);
      const data = await resp.json();
      dispatch(postSignUpUser(data.user));
      localStorage.setItem("token", data.token);
      history.push("/exploreProjects");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};

export const authUser = user => ({
  type: "AUTH_USER",
  user
});

export const authenticateUser = () => {
  return async dispatch => {
    try {
      const reqObj = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `${localStorage.getItem("token")}`
        }
      };
      const resp = await fetch("http://localhost:8080/api/users/authenticateUser", reqObj);
      // console.log(resp)
      const data = await resp.json();
      // console.log(data)
      dispatch(authUser(data.user));
    } catch (error) {
      console.error("Error authenticating user:", error);
    }
  };
};


export const clearCurrentUser = () => ({
  type: "CLEAR_CURRENT_USER"
});


export const DONATION_POOL_UPDATE = 'DONATION_POOL_UPDATE'

export const donationPoolUpdate = user => ({type: DONATION_POOL_UPDATE, user})

export const DONATION_POOL_SUBTRACT = 'DONATION_POOL_SUBTRACT'

export const donationPoolSubtract = user => ({type: DONATION_POOL_SUBTRACT, user})
