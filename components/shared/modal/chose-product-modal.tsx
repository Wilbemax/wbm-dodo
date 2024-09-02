'use client';


import { cn } from '@/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import { DialogContent, Dialog, DialogTitle } from '@/components/ui/dialog';
import { Product } from '@prisma/client';
import { Title } from '../title';
import { ChooseProductForm } from '../chose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from '../chose-pizza-form';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();
    const firstItem = product.items[0]
    const isPizza = Boolean(firstItem.pizzaType)
    const [loading, addCartItem] = useCartStore(state => [state.loading, state.addCartItem])

    const onAddProduct = async () => {
        try {
            await addCartItem({
                productItemId: firstItem.id
            })
            toast.success('Товар успешно добавлен',)
            router.back()
        } catch (e) {
            toast.error('Произошла ошибка при добавлении товара')
        }



    }


    const onAddPizza = async(productItemId: number, ingredients: number[]) => {
        try {
            addCartItem({
                productItemId,
                ingredients
            })
            toast.success('Товар успешно добавлен',)
            router.back()
        } catch (e) {
            toast.error('Произошла ошибка при добавлении товара')
        }

    }

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                aria-describedby={undefined}
                className={cn(
                    'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                    className,
                )}>
                {
                    isPizza ? <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} onSubmit={onAddPizza} ingredients={product.ingredients} items={product.items} loading={loading}/> : <ChooseProductForm imageUrl={product.imageUrl} name={product.name} price={firstItem.price} onSubmit={onAddProduct} loading={loading}/>
                }

            </DialogContent>
        </Dialog>
    );
};