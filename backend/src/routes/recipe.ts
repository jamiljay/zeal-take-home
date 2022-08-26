import { Request, Response, NextFunction } from "express"
import { RecipeModel } from "../models"

export const recipeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { recipeId } = req.params
  try {
    const foundRecipe = await RecipeModel.findById(recipeId)
    if (foundRecipe) {
      res.send(foundRecipe)
    } else {
      res.sendStatus(404)
    }
  } catch (e) {
    next(e)
  }
}
