import { CartItemDTO } from "@/services/dto/cart.dto";

export const getCartItemTotalPrice = (item: CartItemDTO) => {
    const totalIngredients = item.ingredients.reduce((acc, ingredient) => acc+ ingredient.price, 0)

    return (totalIngredients + item.productItem.price) * item.quantity
}