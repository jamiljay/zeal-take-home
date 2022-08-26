import { RECIPE_LOADING, RECIPE_RECEIVE, RECIPE_FAILED } from "../actions"

const initialState = {
  isLoading: false,
  recipe: null,
  error: null,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case RECIPE_LOADING:
      return { ...state, isLoading: true }
    case RECIPE_RECEIVE:
      return { ...state, isLoading: false, recipe: payload }
    case RECIPE_FAILED:
      return { ...state, isLoading: false, error: payload }
    default:
      return state
  }
}
