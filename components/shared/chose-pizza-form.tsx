'use client'

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PizzaImage } from './pizza-image';
import { GroupVariants } from './group-variants';
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { IngredientItem } from './ingredient-item';
import { useSet } from 'react-use';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

/**
 * Форма выбора ПРОДУКТА
 */
export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {
  const [size, setSize] = useState<PizzaSize>(20)
  const [type, setType] = useState<PizzaType>(1)

  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]))

  // debugger
  const pizzaPrise = Number(items.find((item) => item.pizzaType === type && item.size === size)?.price)

  const ingredientsPrise = ingredients.filter((ingredient) => selectedIngredients.has(ingredient.id)).reduce(
    (acc, ingredient) => acc + ingredient.price, 0
  )

  const totalPrise = pizzaPrise + ingredientsPrise


  const description = `${size} см, ${mapPizzaType[type]} пицца`


  const availablePizza = items.filter((item) => item.pizzaType === type )
  const availableSize = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !availablePizza.some((pizza) => Number(pizza.size) === Number(item.value))
  }))


  useEffect(() => {
    const isAvailableSize = availableSize.find((item) => Number(item.value) === size && !item.disabled)
    const availablePizzaSize = availableSize.find((item) => !item.disabled)

    if(!isAvailableSize && availablePizzaSize) {
      setSize(Number(availablePizzaSize.value) as PizzaSize)
    }

   }, [availableSize, size, type])
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <PizzaImage imageUrl={imageUrl} size={size} />
      </div>


      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{description}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants

            items={availableSize}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          // onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrise} ₽
        </Button>
      </div>
    </div>

  );
};