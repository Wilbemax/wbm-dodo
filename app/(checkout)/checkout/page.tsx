'use client'


import { CheckoutAddressForm, CheckoutCart, CheckoutItemDetails, CheckoutItemSkeleton, CheckoutPersonalForm, CheckoutSideBar, Container, Title } from "@/components/shared";
import { CheckoutItem } from "@/components/shared/checkout-item";
import { WhiteBlock } from "@/components/shared/white-block";
import { Button, Input, Skeleton } from "@/components/ui";
import { PizzaType, PizzaSize } from "@/constants/pizza";
import { useCart } from "@/hooks/useCart";
import { getCartItemDetails } from "@/lib/get-cart-item-details";
import { cn } from "@/lib/utils";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema, TCheckoutSchema } from "@/components/shared/checkout/checkout-schema";

export default function CheckOut() {
    const { totalAmount, loading, items, updateItemQuantity, removeCartItem, } = useCart()


    const form = useForm<TCheckoutSchema>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: '',
        }
    })

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    const onSubmit = (data: TCheckoutSchema) => {
        console.log(data);
    }

    return (
        <Container className="mt-10">
            <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />



            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart
                                loading={loading}
                                items={items}
                                removeCartItem={removeCartItem}
                                onClickCountButton={onClickCountButton} />

                            <CheckoutPersonalForm className={loading ? 'opacity-50 pointer-events-none' : ''}/>
                            <CheckoutAddressForm className={loading ? 'opacity-50 pointer-events-none' : ''}/>
                        </div>
                        <div className="w-[450px]">
                            <CheckoutSideBar totalAmount={totalAmount} loading={loading} />
                        </div>
                    </div>
                </form>

            </FormProvider>



        </Container>
    )

}


