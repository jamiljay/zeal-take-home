import React from "react"
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom"

import Home from "./Containers/Home"
import Recipe from "./Containers/Recipe"

const Rotuer = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:recipeId" element={<Recipe />} />
    </Routes>
  </HashRouter>
)

export default Rotuer