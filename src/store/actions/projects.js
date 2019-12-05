
/* Create a project */

export const POST_PROJECT = 'POST_PROJECT'

export const triggerPostProject = project => ({type: POST_PROJECT, project})

export const postProject = project => {
  console.log('this is the dispatch action project', project)
  return async dispatch => {
    try {
      const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({project})
      }
      const response = await fetch('https://debt-crusher.herokuapp.com/api/projects', reqObj)
      const json = await response.json()
      dispatch(triggerPostProject(json))
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }
}


/* fetch projects */

export const GET_PROJECTS = 'GET_PROJECTS'

export const getProjects = projects => ({type: GET_PROJECTS, projects})

export const fetchProjects = () => {
  // console.log('this is the dispatch action project', project)
  return async dispatch => {
    try {
      const response = await fetch('https://debt-crusher.herokuapp.com/api/projects')
      const json = await response.json()
      dispatch(getProjects(json))
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }
}

export const UPDATE_PROJECT_AMOUNT = 'UPDATE_PROJECT_AMOUNT'

export const updateProjectAmount = project => ({type: UPDATE_PROJECT_AMOUNT, project})
