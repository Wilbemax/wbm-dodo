'use client'

import React, { useEffect, useState } from 'react';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { CartDrawer } from './cart-drawer';
import { useCartStore } from '@/store/cart';
import { clearTimeout } from 'timers';

type Props = {};



const CartButton = (props: Props) => {
    const items = useCartStore(state => state.items)
    


    return (
        <CartDrawer >
            <Button className="group relative">
                <b>520 ₽</b>
                <span className="h-full w-[1px] bg-white/30 mx-3" />
                <div className="flex gap-1 items-center transition duration-300 group-hover:opacity-0">
                    <ShoppingCart className="relative" size={16} strokeWidth={2} />
                    <b>{items.length}</b>
                </div>
                <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
            </Button >
        </CartDrawer>

    );
};


export { CartButton };