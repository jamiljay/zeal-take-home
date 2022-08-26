import React from "react"
import { useParams } from "react-router-dom"


const Recipe = () => {
  const { recipeId } = useParams();
  return (
    <h1>Hello Recipe: {recipeId}</h1>
  )
}

export default Recipe;