import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Link } from "react-router-dom"
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
const DEFAULT_INGREDIENTS = JSON.parse(JSON.stringify(INGREDIENT_LIST));

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleIngredient = this.handleIngredient.bind(this)
    this.fetchSearch = this.fetchSearch.bind(this)
    this.state = {
      term: "",
      ingredients: DEFAULT_INGREDIENTS,
    }
  }
  fetchSearch() {
    const { searchRecipes } = this.props
    const { term, ingredients } = this.state
    searchRecipes(term, ingredients);
  }
  handleSearch(event) {
    const term = event.target.value
    this.setState({ term })
  }
  handleIngredient(ingredient, event) {
    const { ingredients } = { ...this.state }
    if (event.target.checked) {
      ingredients.push(ingredient)
    } else {
      const foundIngredient = ingredients.indexOf(ingredient)
      ingredients.splice(foundIngredient, 1)
    }
    this.setState({ ingredients })
  }
  render() {
    const { term, ingredients } = this.state
    const { recipes, isLoading } = this.props
    return (
      <HomeWrapper>
        <Input
          autoFocus={true}
          fullWidth={true}
          onChange={this.handleSearch}
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
                  onChange={this.handleIngredient.bind(this, ingredient)}
                  value={ingredient}
                />
              }
              label={ingredient}
            />
          ))}
        </div>
        <Button onClick={this.fetchSearch}>search</Button>
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
