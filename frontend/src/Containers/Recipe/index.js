import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Container from "@material-ui/core/Container"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import MUILink from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"

import * as actions from "../../actions"

const Recipe = ({ isLoading, recipe, loadRecipe }) => {
  const { recipeId } = useParams();

  useEffect(() => {
    loadRecipe(recipeId);
  }, []);

  if (isLoading) {
    return (
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Typography variant="h4">
          <CircularProgress color="secondary" style={{ marginRight: '1rem' }} />
          Loading a Tasty Recipe
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <MUILink component={Link} to="/">Back To Search</MUILink>
      {!recipe ? (
        <Card variant="outlined" style={{ margin: '1rem 0' }}>
          <CardContent>
            <Typography>Recipe was not found</Typography>
          </CardContent>
        </Card>
      ) : (
        <Card variant = "outlined" style={{ margin: '1rem 0' }}>
          <CardHeader 
            title = {recipe.name}
            subheader={`Ingredients: ${recipe.ingredients.map(({ name }) => name).join(', ')}`} />
          <CardContent>
            <Typography>{recipe.instructions}</Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  )
}

const mapStateToProps = (state) => ({ ...state.recipe });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { loadRecipe: actions.loadRecipe},
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)