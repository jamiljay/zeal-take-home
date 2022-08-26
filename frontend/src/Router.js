import React from "react"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Home from "./Containers/Home"
import Recipe from "./Containers/Recipe"

const Rotuer = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:recipeId" element={<Recipe />} />
    </Routes>
  </BrowserRouter>
)

export default Rotuer