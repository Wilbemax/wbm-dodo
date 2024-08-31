import { PizzaType, PizzaSize } from '@/constants/pizza'
import { Ingredient, ProductItem } from '@prisma/client'

export const calcTotalPizzaPrice = (
  items: ProductItem[],
  ingredients: Ingredient[],
  type: PizzaType,
  size: PizzaSize,
  selectedIngredients: Set<number>
) => {
  const pizzaPrise = Number(
    items.find((item) => item.pizzaType === type && item.size === size)?.price
  )

  const ingredientsPrise = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0)

  return pizzaPrise + ingredientsPrise
}
