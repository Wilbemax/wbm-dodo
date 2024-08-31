'use client';

import React, { FC, PropsWithChildren, ReactNode, useEffect } from 'react';
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
import { ArrowRight } from 'lucide-react';
import { CartDriverItem } from './cart-driver-item';
import { getCartItemDetails } from '@/lib/get-cart-item-details';
import { useCartStore } from '@/store/cart';
import { PizzaSize, PizzaType } from '@/constants/pizza';


interface Props {
    children?: React.ReactNode | undefined;
}

export const CartDrawer = ({ children }: Props) => {
    const [totalAmount, items,fetchCartItems] = useCartStore(state => [state.totalAmount, state.items, state.fetchCartItems])

    useEffect(() => {
        fetchCartItems()
    }, [])

    return (
        <Sheet>
            <SheetTrigger > {children} </SheetTrigger>

            <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
                <SheetHeader>
                    <SheetTitle>
                        В корзине <span className="font-bold">3 товара</span>
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
                    //   onClickCountButton={(type) =>
                    //     onClickCountButton(item.id, item.quantity, type)
                    //   }
                    //   onClickRemove={() => removeCartItem(item.id)}
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
                                //   onClick={() => setRedirecting(true)}
                                //   loading={redirecting}
                                type="submit"
                                className="w-full h-12 text-base">
                                Оформить заказ
                                <ArrowRight className="w-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}