import actionTypes from "../actions/actionTypes";

const initState = {
  msg: '',
  categories: [],
  provinces: []
}

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories || [],
        msg: action.msg || '',
      }
      case actionTypes.GET_PROVINCES:
      return {
        ...state,
        provinces: action.provinces || [],
        msg: action.msg || '',
      }

    default:
      return state;
  }
}

export default appReducer
