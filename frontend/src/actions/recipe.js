export const RECIPE_LOADING = "RECIPE/loading"
export const RECIPE_RECEIVE = "RECIPE/received"
export const RECIPE_FAILED = "RECIPE/failed"

const loading = () => ({ type: RECIPE_LOADING })

const received = (payload) => ({ type: RECIPE_RECEIVE, payload })

const failed = () => ({ type: RECIPE_FAILED })

const fetchRecipe = async (recipeId) => {
  const response = await fetch(`/api/recipe/${recipeId}`)
  const results = await response.json()
  return results
}

export const loadRecipe = (recipeId) => {
  return (dispatch) => {
    dispatch(loading())
    return fetchRecipe(recipeId)
      .then((res) => dispatch(received(res)))
      .catch((err) => dispatch(failed(err)))
  }
}
