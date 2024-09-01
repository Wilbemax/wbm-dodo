import React from 'react'
import * as CartItem from '@/components/shared/cart-item-details'
import { CartItemProps } from './cart-item-details/cart-item-details.types'
import { CountButton } from './count-button'
import { Trash2Icon } from 'lucide-react'


interface Props extends CartItemProps {
    onClickCountButton?: (type: 'plus' | 'minus') => void
    onClickRemove?: () => void

}

export const CartDriverItem = ({ id, imageUrl, name, price, quantity, details, onClickCountButton, onClickRemove }: Props) => {
    return (
        <div className='flex bg-white p-5 gap-6'>
            <CartItem.Image src={imageUrl} />

            <div className='flex-1'>
                <CartItem.Info name={name} details={details} />

                <hr className='my-3' />
                <div className='flex items-center justify-between'>
                    <CountButton onClick={onClickCountButton} value={quantity} />

                    <div className='flex items-center gap-3'>
                        <CartItem.Price value={price} />
                        <Trash2Icon onClick={onClickRemove } className='transition text-gray-400 cursor-pointer  hover:text-red-500' size={16} />
                    </div>

                </div>
            </div>
        </div>
    )
}