'use client'
import React, { useEffect, useState } from 'react'
import { FilterCheckbox, Title } from '@/components/shared'
import { Input, RangeSlider } from '../ui'
import { CheckboxFiltersGroup } from './filter-chexkbox-group'
import { useFilterIngredients } from '@/hooks/useFilterIngredients'
import { useSearchParam, useSet } from 'react-use'
import qs from 'qs'
import { useRouter } from 'next/navigation'

type Props = {
    className?: string
}

interface PriceProps {
    priceFrom?: number
    priceTo?: number
}
interface QueryFilters extends PriceProps {
    size: string[]
    ingredients: string[]
    pizzaType: string[]
}

export const Filters = ({ className }: Props) => {
    const router = useRouter()
    const searchParams = new URLSearchParams(useSearchParam('search') || '')
    const { ingredients, loading, onAddId, selectedIngredients } = useFilterIngredients()

    const [size, { toggle: toggleSize }] = useSet<string>(new Set(searchParams.getAll('size') || []))
    const [pizzaType, { toggle: togglePizzaType }] = useSet<string>(new Set(searchParams.getAll('pizzaType') || []))

    const [price, setPrice] = useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined
    })

    const priceUpdate = (name: keyof PriceProps, value: number) => {
        setPrice({
            ...price,
            [name]: value
        })
    }

    const item = ingredients.map((item) => ({ value: String(item.id), text: item.name }))

    console.log(searchParams);
    

    useEffect(() => {
        const filters: QueryFilters = {
            ...price,
            pizzaType: Array.from(pizzaType),
            size: Array.from(size),
            ingredients: Array.from(selectedIngredients),
        }

        const query = qs.stringify(filters, {
            arrayFormat: 'comma',
        })

        router.push(`?${query}`, { scroll: false })
    }, [ingredients, pizzaType, price, router, size, selectedIngredients])

    return (
        <div className={className}>
            <Title size='sm' text='Фильтрация' className='mb-5 font-bold' />
            <div className='flex flex-col gap-4'>
                <CheckboxFiltersGroup
                    title="Тип теста"
                    name="pizzaTypes"
                    className="mb-5"
                    onClickCheckbox={togglePizzaType}
                    selectedIds={pizzaType}
                    items={[
                        { text: 'Тонкое', value: '1' },
                        { text: 'Традиционное', value: '2' },
                    ]} />

                <CheckboxFiltersGroup
                    title="Размеры"
                    name="sizes"
                    className="mb-5"
                    onClickCheckbox={toggleSize}
                    selectedIds={size}
                    items={[
                        { text: '20 см', value: '20' },
                        { text: '30 см', value: '30' },
                        { text: '40 см', value: '40' },
                    ]}
                />
            </div>
            <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
                <p className='font-bold mb-3'>Цена от и до:</p>
                <div className='flex gap-3 mb-5'>
                    <Input type="number" placeholder="0" min={0} max={1000} value={String(price.priceFrom)} onChange={(e) => priceUpdate('priceFrom', Number(e.target.value))} />
                    <Input type="number" placeholder="1000" min={0} max={1000} value={String(price.priceTo)} onChange={(e) => priceUpdate('priceTo', Number(e.target.value))} />
                </div>
                <RangeSlider min={0} max={1000} value={[
                    price.priceFrom || 0,
                    price.priceTo || 1000
                ]} step={10} onValueChange={([from, to]) => setPrice({ priceFrom: from, priceTo: to })} />
            </div>
            <CheckboxFiltersGroup className="mt-5"
                title="Формат"
                limit={6}
                loading={loading}
                defaultItems={item.slice(0, 6)}
                items={item}
                onClickCheckbox={onAddId}
                selectedIds={selectedIngredients}
            />
        </div>
    )
}