'use client';


import { cn } from '@/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import { DialogContent, Dialog } from '@/components/ui/dialog';
import { ProductWithRelations } from '@/@types/prisma';
import { ProductForm } from '../product-form';

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                aria-describedby={undefined}
                className={cn(
                    'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                    className,
                )}>
                <ProductForm product={product} onSubmit={() => router.back()}/>

            </DialogContent>
        </Dialog>
    );
};