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

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();

    const isPizza = Boolean(product.items[0].pizzaType)

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                aria-describedby={undefined}
                className={cn(
                    'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                    className,
                )}>
                {
                    isPizza ? <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} onSubmit={() => router.back()} ingredients={product.ingredients} items={product.items} /> : <ChooseProductForm imageUrl={product.imageUrl} name={product.name} price={333} onSubmit={() => router.back()} />
                }

            </DialogContent>
        </Dialog>
    );
};