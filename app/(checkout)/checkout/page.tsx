'use client'


import { CheckoutItemDetails, CheckoutItemSkeleton, CheckoutSideBar, Container, Title } from "@/components/shared";
import { CheckoutItem } from "@/components/shared/checkout-item";
import { WhiteBlock } from "@/components/shared/white-block";
import { Button, Input, Skeleton } from "@/components/ui";
import { PizzaType, PizzaSize } from "@/constants/pizza";
import { useCart } from "@/hooks/useCart";
import { getCartItemDetails } from "@/lib/get-cart-item-details";
import { cn } from "@/lib/utils";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";

export default function CheckOut() {
    const { totalAmount, loading, items, updateItemQuantity, removeCartItem, } = useCart()

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    return (
        <Container className="mt-10">
            <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />

            <div className="flex gap-10">
                <div className="flex flex-col gap-10 flex-1 mb-20">
                    <WhiteBlock title="1. Корзина">
                        {<div className="flex flex-col gap-5">
                            {loading
                                ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
                                : items.map((item) => (
                                    <CheckoutItem
                                        key={item.id}
                                        id={item.id}
                                        imageUrl={item.imageUrl}
                                        details={getCartItemDetails(
                                            item.pizzaType as PizzaType,
                                            item.pizzaSize as PizzaSize,
                                            item.ingredients,
                                        )}
                                        name={item.name}
                                        price={item.price}
                                        quantity={item.quantity}
                                        disabled={item.disabled}
                                        onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                                        onClickRemove={() => removeCartItem(item.id)}
                                    />
                                ))}
                        </div>
                        }

                    </WhiteBlock>
                    <WhiteBlock title="2. Персональные данные" >
                        <div className="grid grid-cols-2 gap-5">
                            <Input name="firstName" className="text-base" placeholder="Имя" />
                            <Input name="lastName" className="text-base" placeholder="Фамилия" />
                            <Input name="email" className="text-base" placeholder="E-Mail" />
                            <Input name="phone" className="text-base" placeholder="Телефон" />
                        </div>
                    </WhiteBlock>
                </div>
                <div className="w-[450px]">
                    <CheckoutSideBar totalAmount={totalAmount} loading={loading} />
                </div>
            </div>


        </Container>
    )

}