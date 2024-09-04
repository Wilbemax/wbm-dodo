'use client';

import React, { FC, PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,

} from '@/components/ui/sheet';
import { Button } from '../ui';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDriverItem } from './cart-driver-item';
import { getCartItemDetails } from '@/lib/get-cart-item-details';
import { useCartStore } from '@/store/cart';
import { PizzaSize, PizzaType } from '@/constants/pizza';
import { Title } from './title';
import cart from '@/public/images/empty-box.png'
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';

interface Props {
    onClickCountButton?: (type: 'plus' | 'minus') => void
    children?: React.ReactNode | undefined;
}

export const CartDrawer = ({ children }: Props) => {
    const router = useRouter()
    const {totalAmount, loading, items, updateItemQuantity, removeCartItem} = useCart()

    //Доделать открывание дравера при добавлении продукта

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
        updateItemQuantity(id, newQuantity)
    }

    const redirect = () => {
        router.push('/checkout')
    }

    return (
        <Sheet >
            <SheetTrigger > {children} </SheetTrigger>

            <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
                <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
                    {totalAmount == 0 ? <>

                        <div className="flex flex-col items-center justify-center w-72 mx-auto">
                            <Image src={cart} alt="Empty cart" width={120} height={120} />
                            <Title size="sm" text="Корзина пустая" className="text-center font-bold my-2" />
                            <p className="text-center text-neutral-500 mb-5">
                                Добавьте хотя бы одну пиццу, чтобы совершить заказ
                            </p>

                            <SheetClose>
                                <Button className="w-56 h-12 text-base" size="lg">
                                    <ArrowLeft className="w-5 mr-2" />
                                    Вернуться назад
                                </Button>
                            </SheetClose>
                        </div>

                    </> : <>
                        <SheetHeader>
                            <SheetTitle>
                                В корзине <span className="font-bold">{items.length}</span>
                            </SheetTitle>
                        </SheetHeader>

                        <div className='-mx-6 mt-5 overflow-auto flex-1'>
                            {items.map((item) => (
                                <div key={item.id} className="mb-2">
                                    <CartDriverItem
                                        id={item.id}
                                        imageUrl={item.imageUrl}
                                        details={item.ingredients && getCartItemDetails(
                                            item.pizzaType as PizzaType,
                                            item.pizzaSize as PizzaSize,
                                            item.ingredients
                                        )}
                                        disabled={item.disabled}
                                        name={item.name}
                                        price={item.price}
                                        quantity={item.quantity}
                                        onClickCountButton={(type) =>
                                            onClickCountButton(item.id, item.quantity, type)
                                        }
                                        onClickRemove={() => removeCartItem(item.id)}
                                    />
                                </div>
                            ))}
                        </div>

                        <SheetFooter className="-mx-6 bg-white p-8">
                            <div className="w-full">
                                <div className="flex mb-4">
                                    <span className="flex flex-1 text-lg text-neutral-500">
                                        Итого
                                        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                                    </span>

                                    <span className="font-bold text-lg">{totalAmount} ₽</span>
                                </div>

                                <Link href="/checkout">
                                    <Button
                                        onClick={redirect}
                                        loading={loading}
                                        disabled={items.length == 0}
                                        type="submit"
                                        className="w-full h-12 text-base">
                                        Оформить заказ
                                        <ArrowRight className="w-5 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </SheetFooter>
                    </>}
                </div>
            </SheetContent>
        </Sheet>
    )
}