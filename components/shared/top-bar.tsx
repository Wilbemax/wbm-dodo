import { cn } from '@/lib/utils'
import React from 'react'
import { Container, SortPopup, Categories } from '@/components/shared'
import { Category } from '@prisma/client'

type Props = {
    category: Category[]
    className?: string
}

export const TopBar = ({category, className }: Props) => {
    return (
        <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
            <Container className='flex items-center justify-between'>
                <Categories items={category}/>
                <SortPopup />
            </Container>
        </div>
    )
}