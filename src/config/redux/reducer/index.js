// Redux Section
// Initial State Global
const initialState = {
    popup : false,
    isLogin : false,
    isLoading : false,
    user : {},
    userNotes : [],
  }
  
  //Reducer
  const reducer = (state = initialState, action) => {
    if (action.type === 'CHANGE_POPUP') {
      return {
        ...state,
        popup : action.value
      }
    }
    if (action.type === 'CHANGE_ISLOGIN') {
      return {
        ...state,
        isLogin : action.value
      }
    }
    if (action.type === 'CHANGE_USER') {
      return {
        ...state,
        user : action.value
      }
    }
    if (action.type === 'CHANGE_LOADING') {
      return {
        ...state,
        isLoading : action.value
      }
    }
    if (action.type === 'SET_NOTES') {
      return {
        ...state,
        userNotes : action.value
      }
    }
  
    return state
  }
  // Redux Section End

  export default reducer;