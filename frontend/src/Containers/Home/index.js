import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Link, useSearchParams } from "react-router-dom"
import { HomeWrapper } from "./styles"
import Input from "@material-ui/core/Input"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import LinearProgress from "@material-ui/core/LinearProgress"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import * as actions from "../../actions"

const INGREDIENT_LIST = ["flour", "sugar", "salt", "butter", "milk"]

const Home = ({ isLoading, recipes, searchRecipes }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [term, setTerm] = useState('')
  const [ingredients, setIngredients] = useState(INGREDIENT_LIST)
  const fetchSearch = () => searchRecipes(term, ingredients)
  const ingredientChange = (ingredient, event) => {
    if (event.target.checked) {
      setIngredients([...ingredients, ingredient])
    } else {
      setIngredients(ingredients.filter((i) => i !== ingredient))
    }
  }

  useEffect(() => {
    const paramTerm = searchParams.get('term')
    const paramIngredients = searchParams.get('ingredients')
    if (paramTerm) setTerm(paramTerm)
    if (paramIngredients) setIngredients(searchParams.get('ingredients').split(','))
  }, [])

  useEffect(() => {
    searchParams.set('term', term);
    searchParams.set('ingredients', ingredients);
    setSearchParams(searchParams);
  }, [term, ingredients])

  return (
    <HomeWrapper>
      <Input
        autoFocus={true}
        fullWidth={true}
        onChange={(e) => setTerm(e.target.value)}
        value={term}
      />
      <div>
        <h3>Ingredients on hand</h3>
        {INGREDIENT_LIST.map((ingredient) => (
          <FormControlLabel
            key={ingredient}
            control={
              <Checkbox
                checked={ingredients.includes(ingredient)}
                onChange={(e) => ingredientChange(ingredient, e)}
                value={ingredient}
              />
            }
            label={ingredient}
          />
        ))}
      </div>
      <Button onClick={fetchSearch}>search</Button>
      <Divider />
      {recipes && (
        <List>
          {recipes.map((recipe) => (
            <ListItem component={Link} to={`/${recipe.id}`} key={recipe.id}>
              <ListItemText primary={recipe.name} />
            </ListItem>
          ))}
        </List>
      )}
      {isLoading && <LinearProgress />}
      <Divider />
    </HomeWrapper>
  )
}

const mapStateToProps = (state) => {
  const { search } = state
  return { ...search }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      searchRecipes: actions.searchRecipes,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
