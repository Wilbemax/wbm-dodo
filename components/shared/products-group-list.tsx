'use client'

import { cn } from "@/lib/utils"
import { Title } from "./title"
import { ProductCard } from "./product-card"
import { useIntersection } from 'react-use'
import { useEffect, useRef } from "react"
import { useCategoryStore } from "@/store/category"
import { ProductWithRelations } from "@/@types/prisma"

type Props = {
    title: string
    products: ProductWithRelations[]
    className?: string
    listClassName?: string
    categoryId: number
}

export const ProductsGroupList = ({ title, products, categoryId, className, listClassName }: Props) => {
    const setActivatedCategoryById = useCategoryStore((state) => state.setActivatedId)
    const intersectionRef = useRef(null)
    const intersection =  useIntersection(intersectionRef, {
        threshold: 0.4
    })

    useEffect(() => {
        if (intersection?.isIntersecting){
            setActivatedCategoryById(categoryId)
        }
    }, [categoryId, intersection?.isIntersecting, setActivatedCategoryById, title])

    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />

            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {products.map((product, _i) =>
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.items[0].price}
                        imageUrl={product.imageUrl}
                        ingredients={product.ingredients} />
                        
                )}
            </div>
        </div>
    )
}