
/* Edit User */
export const UPDATE_USER = 'UPDATE_USER'

export const updateUser = updatedUser => ({type: UPDATE_USER, updatedUser})

export const editUser = (e, user) => {
  console.log(e.target[2])
  console.log(user)

    var data = new FormData()
    data.append('userImage', e.target[2].files[0])
    data.append('displayName', user.displayName)
    data.append('bio', user.bio)
    data.append('birthDate', user.birthDate)
    console.log(data)
    console.dir(data)

    return async dispatch => {
      try {
        const reqObj = {
          method: "PATCH",
          body: data
        };
        const resp = await fetch('http://localhost:8080/api/users/' + user.id, reqObj)
        const newData = await resp.json();
        console.log(newData)
        dispatch(updateUser(newData));
        // history.push("/myProfile");
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

}


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
      history.push("/welcome");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};


export const postSignUpUser = user => ({
  type: "SET_CURRENT_USER",
  user
});

export const signUpUser = (e, user, history) => {
  // console.log(e.target)
  // console.dir(e.target[3].files[0])
  // console.log(user)

  var data = new FormData()
  data.append('userImage', e.target[3].files[0])
  data.append('username', user.username)
  data.append('password', user.password)
  data.append('displayName', user.displayName)
  data.append('bio', user.bio)
  data.append('birthDate', user.birthDate)
  console.log(data)
  console.dir(data)

  /* headers: { "Content-Type": "application/json" }, JSON.stringify(user)*/
  return async dispatch => {
    try {
      const reqObj = {
        method: "POST",
        body: data
      };
      const resp = await fetch("http://localhost:8080/api/users/signup", reqObj);
      const newData = await resp.json();
      // console.log(newData)
      dispatch(postSignUpUser(newData.user));
      localStorage.setItem("token", newData.token);
      history.push("/welcome");
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
